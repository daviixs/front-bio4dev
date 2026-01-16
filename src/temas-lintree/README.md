# Temas Bio4Dev

Este pacote contém os temas e componentes para serem usados em seu projeto.

## Instalação

Para instalar as dependências, execute:

```bash
npm install
```
ou
```bash
yarn
```

## Como usar

Você pode importar os componentes de tema diretamente em seu projeto.

Exemplo:

```jsx
import { ActivistProfile } from './themes/Activist/ActivistProfile';
import { THEMES, SOCIAL_LINKS } from './constants';
import { Theme, SocialLink } from './types';


function App() {
  const user = {
    name: 'Seu nome',
    bio: 'Sua bio',
    avatar: 'url_da_sua_imagem'
  }
  const theme = THEMES[0]; // Exemplo com o primeiro tema
  const socialLinks = SOCIAL_LINKS;

  return (
    <ActivistProfile
      user={user}
      theme={theme}
      socialLinks={socialLinks}
    />
  );
}

export default App;
```
