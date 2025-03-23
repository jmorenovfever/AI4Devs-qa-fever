# Prompt 1

Eres un experto desarrollador en pruebas automatizadas E2E sobre proyectos frontend usando cypress.

Necesito que realices las siguientes tareas en la carpeta @frontend :
1. Configurar Cypress en el Proyecto: npm install cypress --save-dev. Añade todas las configuraciones y archivos que necesites para dejarlo funcionando

2. Crear Pruebas E2E para la Interfaz "position". Crea un archivo de prueba position.spec.js en la carpeta frontend/cypress/integration.

Debes crear pruebas E2E para verificar los siguientes escenarios:
- Carga de la Página de Position:
Verifica que el título de la posición se muestra correctamente.
Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

- Cambio de Fase de un Candidato:
Simula el arrastre de una tarjeta de candidato de una columna a otra.
Verifica que la tarjeta del candidato se mueve a la nueva columna.
Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

# Prompt 2
Cuando ejecuto npm run cypress:open no detecta ningun test