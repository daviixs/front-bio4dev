# Componentes de Autenticação - Login Page

## 📁 Estrutura de Componentes

```
src/components/Auth/
├── LoginLayout.tsx      # Layout principal responsivo
├── LoginForm.tsx        # Formulário completo de login
├── LoginImage.tsx       # Imagem de fundo (desktop)
├── TextInput.tsx        # Input reutilizável com toggle de senha
├── RememberMe.tsx       # Switch de "Remember me"
└── SocialLoginButton.tsx # Botão de login social (Google)
```

## 🖼️ Imagem de Fundo

Para adicionar a imagem de fundo do Figma:

1. Coloque a imagem em: `public/assets/login-bg.jpg`
2. Ou atualize o caminho em `LoginImage.tsx` linha 10

```tsx
backgroundImage: 'url(/assets/login-bg.jpg)',
```

## 🎨 Cores e Estilos

- **Background**: `#FFFFFF` (branco)
- **Inputs**: 
  - Background: `#F5F5F5` (gray-100)
  - Focus: Ring azul (`ring-blue-600`)
- **Botão Primário**: 
  - `bg-blue-600` / `hover:bg-blue-700`
- **Botão Google**: 
  - `bg-gray-900` / `hover:bg-gray-800`

## 📱 Responsividade

- **Desktop (>= 1024px)**: Layout de 2 colunas (60% imagem, 40% formulário)
- **Mobile (< 1024px)**: Layout de coluna única, sem imagem

## 🚀 Uso

```tsx
import Login from '@/pages/Login';

// No seu router
<Route path="/login" element={<Login />} />
```

## ✨ Features Implementadas

- ✅ Layout responsivo pixel-perfect
- ✅ Toggle de senha (mostrar/ocultar)
- ✅ Switch de "Remember me"
- ✅ Botão de login social (Google)
- ✅ Validação de formulário
- ✅ Animações suaves (hover, focus)
- ✅ Acessibilidade (aria-labels, focus states)
- ✅ Transições suaves

## 📝 Próximos Passos

1. Adicionar a imagem real do Figma em `public/assets/login-bg.jpg`
2. Conectar com API de autenticação
3. Implementar validação de formulário completa
4. Adicionar tratamento de erros
