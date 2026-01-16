# Bio4Dev Influencer Portfolio Editor

## Overview
Bio4Dev is a web application designed to help influencers create and manage their online portfolios. The application provides a user-friendly interface for editing various aspects of an influencer's profile, including basic information, social media links, buttons, and styling options.

## Features
- **Portfolio Editing**: Influencers can edit their profiles with a dedicated editor interface.
- **Theme-Specific Editors**: Each portfolio can be customized using different themes, each with its unique editing interface.
- **Live Preview**: Users can see a live preview of their portfolio as they make changes.
- **Responsive Design**: The application is designed to work seamlessly on various devices.

## Project Structure
```
front-bio4dev
├── src
│   ├── pages
│   │   ├── InfluencerEditorPage.tsx
│   │   └── InfluencerPreviewPage.tsx
│   ├── components
│   │   └── editors
│   │       ├── ActivistEditor.tsx
│   │       ├── AltMusicEditor.tsx
│   │       ├── ArchitectEditor.tsx
│   │       ├── ArtistEditor.tsx
│   │       ├── AthleteEditor.tsx
│   │       ├── BusinessEditor.tsx
│   │       ├── CreatorEditor.tsx
│   │       ├── EcoFashionEditor.tsx
│   │       ├── GourmetEditor.tsx
│   │       ├── InnovationEditor.tsx
│   │       ├── StreamerEditor.tsx
│   │       └── shared
│   │           ├── EditorLayout.tsx
│   │           ├── BasicInfoEditor.tsx
│   │           ├── SocialLinksEditor.tsx
│   │           ├── ButtonsEditor.tsx
│   │           ├── StyleEditor.tsx
│   │           └── PreviewPanel.tsx
│   ├── hooks
│   │   ├── usePortfolioEditor.ts
│   │   └── useThemeEditor.ts
│   ├── lib
│   │   └── editors
│   │       ├── editorRegistry.ts
│   │       └── editorUtils.ts
│   └── types
│       └── editor.ts
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd front-bio4dev
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.