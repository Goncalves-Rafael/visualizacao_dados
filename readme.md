## TODO:
1. Definir as cores de cada estado.
1. Configurar cores dos fenômenos em [mapScript.js COLORS_FENOMENOS](mapScript.js)
1. Melhorar coloração dos pontos baseado no # de firespots em [mapScript.js::scale](mapScript.js), ou usar o raio dos círculos ao invés da cor
1. Calcular valores por estado em [mapScript.js::getStatesDataSets](mapScript.js)
1. Adicionar um gráfico semelhante ao [lineScript.js](lineScript.js) para os dados de desmatamento
1. Melhorar o filtro de range de ano, foi uma solução temporário só para testes
1. Adicionar legendas necessárias em cada gráfico

## Executar
Se tiver npx instalado basta executar na raiz:
```shell
npx http-server
```