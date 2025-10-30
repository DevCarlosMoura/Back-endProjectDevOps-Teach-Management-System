#!/bin/bash

echo "=========================================="
echo "Testando Build do Backend..."
echo "=========================================="
cd backend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erro no build do backend"
    exit 1
fi
echo "✅ Backend compilado com sucesso"
cd ..

echo ""
echo "=========================================="
echo "Testando Build do Frontend..."
echo "=========================================="
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erro no build do frontend"
    exit 1
fi
echo "✅ Frontend compilado com sucesso"
cd ..

echo ""
echo "=========================================="
echo "✅ Todos os testes passaram!"
echo "=========================================="
echo ""
echo "Para executar o projeto com Docker:"
echo "  docker-compose up --build"
echo ""
echo "Acessos:"
echo "  Frontend: http://localhost:80"
echo "  Backend API: http://localhost:3000"
echo "  Swagger: http://localhost:3000/api-docs"
