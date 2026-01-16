# Editores de Portfólios para Influenciadores

## 📝 Visão Geral

Este diretório contém editores customizados para cada tema de portfólio de influenciadores. Cada editor foi projetado com uma interface única e específica para seu nicho, oferecendo uma experiência de edição personalizada.

## 🎨 Editores Disponíveis

### 1. **ActivistEditor** 🌱

- **Tema**: Ativismo e causas sociais
- **Cores**: Verde e esmeralda
- **Foco**: Ações comunitárias, campanhas e movimentos sociais

### 2. **AltMusicEditor** 🎸

- **Tema**: Música alternativa
- **Cores**: Roxo escuro e preto
- **Foco**: Singles, álbuns, shows e plataformas de streaming

### 3. **ArchitectEditor** 🏗️

- **Tema**: Arquitetura e design
- **Cores**: Tons neutros e pedra
- **Foco**: Projetos arquitetônicos e portfolio profissional

### 4. **ArtistEditor** 🎨

- **Tema**: Arte visual
- **Cores**: Rosa e âmbar
- **Foco**: Obras de arte, exposições e galerias

### 5. **AthleteEditor** 🏆

- **Tema**: Esportes e atletismo
- **Cores**: Laranja e amarelo
- **Foco**: Conquistas, patrocínios e performance

### 6. **BusinessEditor** 💼

- **Tema**: Negócios e empresas
- **Cores**: Azul corporativo
- **Foco**: Serviços, consultoria e networking profissional

### 7. **CreatorEditor** 🎬

- **Tema**: Criadores de conteúdo digital
- **Cores**: Roxo e rosa
- **Foco**: Conteúdo, cursos e comunidade

### 8. **EcoFashionEditor** 🌿

- **Tema**: Moda sustentável
- **Cores**: Verde-água e turquesa
- **Foco**: Coleções eco-friendly e slow fashion

### 9. **GourmetEditor** 🍳

- **Tema**: Gastronomia e culinária
- **Cores**: Âmbar e laranja
- **Foco**: Receitas, menu e reservas

### 10. **InnovationEditor** 💡

- **Tema**: Inovação e tecnologia
- **Cores**: Ciano e azul
- **Foco**: Startups, pitch decks e projetos tech

### 11. **StreamerEditor** 📺

- **Tema**: Streaming e gaming
- **Cores**: Roxo vibrante e preto
- **Foco**: Horário de lives, Discord e doações

## 🛠️ Funcionalidades Comuns

Todos os editores incluem:

- ✅ **Informações básicas**: Nome, bio e foto de perfil
- ✅ **Links customizáveis**: Adicionar/remover links com títulos personalizados
- ✅ **Redes sociais**: Múltiplas plataformas (Instagram, YouTube, TikTok, etc.)
- ✅ **Personalização de cores**: Cor de destaque e cor do texto
- ✅ **Interface responsiva**: Design adaptável para diferentes telas
- ✅ **Validação em tempo real**: Feedback imediato ao usuário

## 📋 Interface Props

Cada editor recebe as seguintes props:

```typescript
interface EditorProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}
```

## 🎯 Uso no InfluencerEditorPage

Os editores são mapeados no arquivo `InfluencerEditorPage.tsx`:

```typescript
const THEME_EDITORS: Record<string, React.ComponentType<any>> = {
  activist: ActivistEditor,
  altmusic: AltMusicEditor,
  architect: ArchitectEditor,
  artist: ArtistEditor,
  athlete: AthleteEditor,
  business: BusinessEditor,
  creator: CreatorEditor,
  ecofashion: EcoFashionEditor,
  gourmet: GourmetEditor,
  innovation: InnovationEditor,
  streamer: StreamerEditor,
};
```

## 🚀 Como Funciona

1. **Seleção do tema**: O usuário escolhe um tema de portfólio
2. **Redirecionamento**: É redirecionado para `/portfolio/edit/:portfolioId`
3. **Carregamento**: O editor correspondente ao tema é carregado
4. **Edição**: O usuário pode editar todos os campos do perfil
5. **Salvamento**: As alterações são salvas via API

## 🎨 Design System

Cada editor utiliza:

- **Ícones do Lucide React**: Ícones temáticos para cada nicho
- **Tailwind CSS**: Classes utilitárias para estilização
- **Componentes shadcn/ui**: Input, Textarea, Button, Label
- **Gradientes personalizados**: Cabeçalhos com cores temáticas

## 📱 Responsividade

Todos os editores são totalmente responsivos com:

- Container `max-w-4xl` para desktop
- Espaçamento consistente (`space-y-6`)
- Grid adaptável para cores
- Formulários otimizados para mobile

## 🔄 Próximos Passos

- [ ] Adicionar preview em tempo real
- [ ] Implementar drag-and-drop para reordenar links
- [ ] Upload de imagens direto no editor
- [ ] Templates pré-configurados por tema
- [ ] Importar/exportar configurações

---

**Criado em**: Janeiro 2026  
**Última atualização**: Janeiro 2026  
**Versão**: 1.0.0
