#!/bin/bash

##############################################################################
# Script de Processamento de Ícones de Heróis - For Honor
# 
# Este script automatiza o processamento de ícones de heróis para garantir
# consistência visual e otimização de tamanho.
#
# Pré-requisitos:
#   - ImageMagick (comando 'convert')
#   - pngquant (para otimização)
#
# Uso:
#   ./process-hero-icons.sh input.png output.png
#   ou
#   ./process-hero-icons.sh -b input_directory/
#
##############################################################################

set -e  # Sair em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações padrão
SIZE=128
QUALITY=90
COMPRESSION=256

# Função de ajuda
show_help() {
    echo "Uso: $0 [OPÇÕES] INPUT OUTPUT"
    echo ""
    echo "Processa ícones de heróis para o projeto RankedHonor"
    echo ""
    echo "Opções:"
    echo "  -h, --help              Mostra esta mensagem de ajuda"
    echo "  -s, --size SIZE         Define o tamanho (padrão: 128px)"
    echo "  -q, --quality QUALITY   Define a qualidade (padrão: 90)"
    echo "  -b, --batch DIR         Processa todos os arquivos em um diretório"
    echo "  -c, --colors COLORS     Número de cores para compressão (padrão: 256)"
    echo ""
    echo "Exemplos:"
    echo "  $0 warden-raw.png warden.png"
    echo "  $0 -b ./raw-icons/"
    echo "  $0 -s 256 -q 95 input.png output.png"
}

# Verifica dependências
check_dependencies() {
    if ! command -v convert &> /dev/null; then
        echo -e "${RED}Erro: ImageMagick não está instalado${NC}"
        echo "Instale com: sudo apt-get install imagemagick"
        exit 1
    fi
    
    if ! command -v pngquant &> /dev/null; then
        echo -e "${RED}Erro: pngquant não está instalado${NC}"
        echo "Instale com: sudo apt-get install pngquant"
        exit 1
    fi
}

# Processa um único arquivo
process_single_file() {
    local input="$1"
    local output="$2"
    
    if [[ ! -f "$input" ]]; then
        echo -e "${RED}Erro: Arquivo de entrada não encontrado: $input${NC}"
        return 1
    fi
    
    echo -e "${BLUE}Processando: $input → $output${NC}"
    
    # Cria um arquivo temporário
    local temp_file="${output%.png}_temp.png"
    
    # Passo 1: Redimensionar e centralizar com ImageMagick
    # - Resize: mantém proporção, ajusta para caber em SIZExSIZE
    # - Gravity center: centraliza a imagem
    # - Extent: cria um canvas de SIZExSIZE
    # - Background transparent: fundo transparente
    echo -e "  ${YELLOW}→ Redimensionando para ${SIZE}x${SIZE}px...${NC}"
    convert "$input" \
        -resize "${SIZE}x${SIZE}" \
        -gravity center \
        -extent "${SIZE}x${SIZE}" \
        -background none \
        "$temp_file"
    
    # Passo 2: Otimizar com pngquant
    echo -e "  ${YELLOW}→ Otimizando com pngquant...${NC}"
    pngquant --quality="${QUALITY}" --speed 1 --force --output "$output" "$temp_file" 2>/dev/null || {
        # Se pngquant falhar (ex: imagem já muito otimizada), usa o arquivo temp
        echo -e "  ${YELLOW}→ Usando arquivo sem compressão adicional${NC}"
        mv "$temp_file" "$output"
    }
    
    # Remove arquivo temporário se ainda existir
    [[ -f "$temp_file" ]] && rm "$temp_file"
    
    # Mostra informações do arquivo final
    local size_kb=$(du -k "$output" | cut -f1)
    echo -e "${GREEN}✓ Concluído: $output (${size_kb}KB)${NC}"
    echo ""
}

# Processa um diretório inteiro
process_batch() {
    local input_dir="$1"
    
    if [[ ! -d "$input_dir" ]]; then
        echo -e "${RED}Erro: Diretório não encontrado: $input_dir${NC}"
        exit 1
    fi
    
    # Cria diretório de saída se não existir
    local output_dir="${input_dir}/processed"
    mkdir -p "$output_dir"
    
    echo -e "${BLUE}Processando todos os arquivos em: $input_dir${NC}"
    echo -e "${BLUE}Saída em: $output_dir${NC}"
    echo ""
    
    # Conta arquivos
    local total=$(find "$input_dir" -maxdepth 1 -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | wc -l)
    local count=0
    
    # Processa cada arquivo
    find "$input_dir" -maxdepth 1 -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
        count=$((count + 1))
        local basename=$(basename "$file")
        local filename="${basename%.*}"
        local output="$output_dir/${filename}.png"
        
        echo -e "${BLUE}[${count}/${total}]${NC}"
        process_single_file "$file" "$output"
    done
    
    echo -e "${GREEN}✓ Processamento em lote concluído!${NC}"
    echo -e "${GREEN}  Arquivos processados salvos em: $output_dir${NC}"
}

# Parse de argumentos
main() {
    check_dependencies
    
    # Se não houver argumentos, mostra ajuda
    if [[ $# -eq 0 ]]; then
        show_help
        exit 0
    fi
    
    # Parse de opções
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -s|--size)
                SIZE="$2"
                shift 2
                ;;
            -q|--quality)
                QUALITY="$2"
                shift 2
                ;;
            -c|--colors)
                COMPRESSION="$2"
                shift 2
                ;;
            -b|--batch)
                process_batch "$2"
                exit 0
                ;;
            *)
                # Assume que são input e output
                if [[ -z "$INPUT" ]]; then
                    INPUT="$1"
                elif [[ -z "$OUTPUT" ]]; then
                    OUTPUT="$1"
                else
                    echo -e "${RED}Erro: Muitos argumentos${NC}"
                    show_help
                    exit 1
                fi
                shift
                ;;
        esac
    done
    
    # Valida que temos input e output
    if [[ -z "$INPUT" ]] || [[ -z "$OUTPUT" ]]; then
        echo -e "${RED}Erro: INPUT e OUTPUT são obrigatórios${NC}"
        show_help
        exit 1
    fi
    
    process_single_file "$INPUT" "$OUTPUT"
}

# Executa o script
main "$@"
