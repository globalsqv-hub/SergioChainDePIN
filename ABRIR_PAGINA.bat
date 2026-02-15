@echo off
title SergioChain - Abriendo la pagina
cd /d "%~dp0"

echo.
echo  ====  SergioChain - Abriendo la pagina  ====
echo.

echo [1/2] Comprobando e instalando dependencias...
call npm install
if errorlevel 1 (
  echo.
  echo  ERROR: No se pudo instalar. Asegurate de tener Node.js instalado desde https://nodejs.org
  echo.
  pause
  exit /b 1
)

echo.
echo [2/2] Iniciando la pagina...
echo.
echo  Cuando veas "serving on port 5000", abre el navegador en:  http://localhost:5000
echo  Para cerrar la pagina, cierra esta ventana o pulsa Ctrl+C
echo.

call npm run lanzar

pause
