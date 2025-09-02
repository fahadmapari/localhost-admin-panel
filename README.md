[![Netlify Status](https://api.netlify.com/api/v1/badges/c73ed9f4-7188-4d0a-b801-2e2588438008/deploy-status)](https://app.netlify.com/projects/localhostadmin/deploys)

# Screenshots - 30/08/2025
<img width="1920" height="1080" alt="Screenshot (1)" src="https://github.com/user-attachments/assets/798fecd5-dc71-4b3f-9b66-aae57d15d57e" />
<img width="1920" height="1080" alt="Screenshot (2)" src="https://github.com/user-attachments/assets/4f556325-e1a2-4780-a0fd-1accaf79cc5c" />
<img width="1920" height="1080" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/2044eae3-5306-4a59-9d0e-de10c257f1dd" />
<img width="1920" height="1080" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/e996d5fb-67a3-4ea5-92e9-6099714e2e1b" />
<img width="1920" height="1080" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/5a091819-ded6-4f95-82d2-85463df2390a" />
<img width="1920" height="1080" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/7aa8417a-f840-4f72-85e1-328e7b6c7ef8" />
<img width="1920" height="1080" alt="Screenshot (7)" src="https://github.com/user-attachments/assets/1db81c19-90f8-4064-8943-626278498d89" />
<img width="1920" height="1080" alt="Screenshot (8)" src="https://github.com/user-attachments/assets/7dd3d258-48a0-4ca7-91bb-4be8fdbfec2b" />
<img width="1920" height="1080" alt="Screenshot (9)" src="https://github.com/user-attachments/assets/1707a814-6b89-4e09-a759-d899c907ae09" />
<img width="1920" height="1080" alt="Screenshot (10)" src="https://github.com/user-attachments/assets/e367a6f8-5941-40bb-aae6-ee09c4c24ab1" />
<img width="1920" height="1080" alt="Screenshot (11)" src="https://github.com/user-attachments/assets/a4f6293b-efd8-49a7-8876-5f9711bbef67" />
<img width="1920" height="1080" alt="Screenshot (12)" src="https://github.com/user-attachments/assets/0ea07d78-8532-4dee-aeb5-1424846f5257" />
<img width="1920" height="1080" alt="Screenshot (13)" src="https://github.com/user-attachments/assets/9ae77422-bb60-4f61-9ff0-ecdfd8270bc4" />
<img width="1920" height="1080" alt="Screenshot (14)" src="https://github.com/user-attachments/assets/bac89085-522c-467a-be42-1efe13bca5cf" />
<img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/871c711e-fe4e-4192-a9c8-cf948b1ac863" />
<img width="1920" height="1080" alt="Screenshot (16)" src="https://github.com/user-attachments/assets/c62a01ec-50f0-4bf2-9f23-7caa053f7dff" />


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
