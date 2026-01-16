import { useState, useEffect } from "react";

const useThemeEditor = (themeId: string) => {
  const [themeEditor, setThemeEditor] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadThemeEditor = async () => {
      try {
        const editorModule = await import(`../components/editors/${themeId}Editor`);
        setThemeEditor(() => editorModule.default);
      } catch (error) {
        console.error("Error loading theme editor:", error);
        setThemeEditor(null);
      }
    };

    loadThemeEditor();
  }, [themeId]);

  return themeEditor;
};

export default useThemeEditor;