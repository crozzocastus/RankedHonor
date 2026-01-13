# Figma Components / Componentes do Figma

## English

This directory contains components that were designed in Figma and implemented in React.

### Purpose
This directory serves as a bridge between design and implementation:
- Store components directly imported or inspired by Figma designs
- Maintain design-development consistency
- Provide a reference for components from design files
- Keep design-specific implementations organized

### Current Components

- **ImageWithFallback.tsx** - Image component with fallback handling

### Best Practices
- Keep components as close to Figma designs as possible
- Document any deviations from design
- Use Figma variable names when applicable
- Consider using Figma's design tokens/variables
- Include comments referencing Figma file/frame

### Workflow
1. Designer creates component in Figma
2. Developer implements component here
3. Component is reviewed against design
4. Once stable, may be moved to appropriate directory (ui/, shared/, etc.)

### Note
Components may graduate from this directory to other locations once they're:
- Well-tested and stable
- Part of the established design system
- Reused across the application

---

## Português

Este diretório contém componentes que foram desenhados no Figma e implementados em React.

### Propósito
Este diretório serve como ponte entre design e implementação:
- Armazenar componentes diretamente importados ou inspirados por designs do Figma
- Manter consistência entre design e desenvolvimento
- Fornecer referência para componentes dos arquivos de design
- Manter implementações específicas de design organizadas

### Componentes Atuais

- **ImageWithFallback.tsx** - Componente de imagem com tratamento de fallback

### Boas Práticas
- Mantenha componentes o mais próximo possível dos designs do Figma
- Documente qualquer desvio do design
- Use nomes de variáveis do Figma quando aplicável
- Considere usar tokens/variáveis de design do Figma
- Inclua comentários referenciando arquivo/frame do Figma

### Fluxo de Trabalho
1. Designer cria componente no Figma
2. Desenvolvedor implementa componente aqui
3. Componente é revisado contra o design
4. Uma vez estável, pode ser movido para diretório apropriado (ui/, shared/, etc.)

### Nota
Componentes podem se formar deste diretório para outras localizações quando são:
- Bem testados e estáveis
- Parte do sistema de design estabelecido
- Reutilizados pela aplicação
