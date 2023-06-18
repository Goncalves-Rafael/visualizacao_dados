## Acesso:
Disponível https://goncalves-rafael.github.io/visualizacao_dados/

## TODO:
1. Definir as cores de cada estado.
1. Configurar cores dos fenômenos em [mapScript.js COLORS_FENOMENOS](mapScript.js) (DONE)
1. Melhorar coloração dos pontos baseado no # de firespots em [mapScript.js::scale](mapScript.js), ou usar o raio dos círculos ao invés da cor
1. Calcular valores por estado em [mapScript.js::getStatesDataSets](mapScript.js) (DONE)
1. Adicionar um gráfico semelhante ao [lineScript.js](lineScript.js) para os dados de desmatamento (DONE)
1. Melhorar o filtro de range de ano, foi uma solução temporário só para testes (DONE)
1. Adicionar legendas necessárias em cada gráfico (DONE)

## Executar
Se tiver npx instalado basta executar na raiz:
```shell
npx http-server
```