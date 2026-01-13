# UI Components / Componentes de UI

## English

This directory contains base UI components (shadcn/ui library) that serve as building blocks for the application.

### Purpose
- Provide consistent, accessible, and customizable UI primitives
- Based on Radix UI primitives with Tailwind CSS styling
- Follow shadcn/ui component patterns
- Ensure accessibility and ARIA compliance
- Enable theme customization

### Component Categories

**Form Components:**
- Button, Input, Textarea, Label
- Checkbox, Radio Group, Switch
- Select, Combobox (Command)
- Form helpers

**Layout Components:**
- Card, Separator, Aspect Ratio
- Accordion, Collapsible, Tabs
- Resizable panels, Scroll Area

**Navigation:**
- Navigation Menu, Menubar
- Breadcrumb, Pagination

**Overlay Components:**
- Dialog, Alert Dialog, Sheet, Drawer
- Popover, Hover Card, Tooltip
- Dropdown Menu, Context Menu

**Feedback:**
- Alert, Toast (Sonner)
- Progress, Skeleton

**Data Display:**
- Table, Avatar, Badge
- Chart components

### Usage Example
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

<Card>
  <Button variant="primary">Click me</Button>
</Card>
```

### Customization
Components can be customized via:
- Tailwind CSS classes
- Variant props
- Theme configuration
- CSS variables

---

## Português

Este diretório contém componentes UI base (biblioteca shadcn/ui) que servem como blocos de construção para a aplicação.

### Propósito
- Fornecer primitivos UI consistentes, acessíveis e customizáveis
- Baseado em primitivos Radix UI com estilização Tailwind CSS
- Seguir padrões de componentes shadcn/ui
- Garantir acessibilidade e conformidade ARIA
- Permitir customização de tema

### Categorias de Componentes

**Componentes de Formulário:**
- Button, Input, Textarea, Label
- Checkbox, Radio Group, Switch
- Select, Combobox (Command)
- Auxiliares de formulário

**Componentes de Layout:**
- Card, Separator, Aspect Ratio
- Accordion, Collapsible, Tabs
- Painéis redimensionáveis, Scroll Area

**Navegação:**
- Navigation Menu, Menubar
- Breadcrumb, Pagination

**Componentes de Overlay:**
- Dialog, Alert Dialog, Sheet, Drawer
- Popover, Hover Card, Tooltip
- Dropdown Menu, Context Menu

**Feedback:**
- Alert, Toast (Sonner)
- Progress, Skeleton

**Exibição de Dados:**
- Table, Avatar, Badge
- Componentes de gráfico

### Exemplo de Uso
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

<Card>
  <Button variant="primary">Clique aqui</Button>
</Card>
```

### Customização
Componentes podem ser customizados via:
- Classes Tailwind CSS
- Props de variante
- Configuração de tema
- Variáveis CSS
