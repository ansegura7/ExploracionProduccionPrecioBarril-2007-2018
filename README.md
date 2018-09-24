# Consecuencias del Precio del Barril de Petróleo en Colombia (2007-2018)

![alt text](https://raw.githubusercontent.com/ansegura7/PrecioBarrilPerforacionProduccion-2007-2018/master/img/main-banner.jpg)

- Estudiante: Andres Segura Tinoco
- Código: 201711582
- Curso: Visual Analytics
- Tarea 3
- Fecha: 25/9/2018
- Licencia: MIT

## Datos del Proyecto – What
Los datos que se usaron para el proyecto provienen de un dataset del tipo tabla (tables), que contiene las siguientes variables (attrubutes):
-	Year: ordered, quantitative, sequencial.
-	Exploratory_Wells: ordered, quantitative, sequencial.
-	Avg_WTI_Price_USD: ordered, quantitative, sequencial.
-	Avg_Qo_Bbls: ordered, quantitative, sequencial.
-	Ingresos_USD: ordered, quantitative, sequencial.

Dicho dataset objetivo, fue formado a partir de la unión y preprocesamiento de distintas fuentes de datos (todas tomadas de los Datos Abiertos de Colombia), que a continuación se enumeran:
- Cantidad Pozos Exploratorios Anuales: https://www.datos.gov.co/Minas-y-Energ-a/Cantidad-Pozos-Exploratorios-Anuales/mgnj-a2mn
- Precio WTI Promedio Anual 2010 - 2018: https://www.datos.gov.co/Minas-y-Energ-a/Precio-WTI-Promedio-Anual-2010-2018/nb7h-xzbs
- Producción y Comercialización de Petróleo y Gas 2007- 2013: https://www.datos.gov.co/Minas-y-Energ-a/Produccion-y-Comercializacion-de-Petroleo-y-Gas-20/dssz-yyu7
- Producción Fiscalizada de Petróleo en Colombia para el 2013: https://www.datos.gov.co/Minas-y-Energ-a/Producci-n-Fiscalizada-de-Petr-leo-2013/6c3y-rvm8
- Producción fiscalizada de Petróleo en Colombia para el 2014: https://www.datos.gov.co/Minas-y-Energ-a/Producci-n-Fiscalizada-de-Petr-leo-2014/gse3-nd4e
- Producción fiscalizada de Petróleo en Colombia para el 2015: https://www.datos.gov.co/Minas-y-Energ-a/Produccion-Fiscalizada-de-Petr-leo-2015/wr29-8raj
- Producción fiscalizada de Petróleo en Colombia para el 2016: https://www.datos.gov.co/Minas-y-Energ-a/Produccion-Fiscalizada-de-Petr-leo-2016/qq7g-e4zr
- Producción fiscalizada de Petróleo en Colombia para el 2017: https://www.datos.gov.co/Minas-y-Energ-a/Producci-n-Fiscalizada-de-Petr-leo-2017/xhmd-pcpc

## Objetivos del Proyecto - Why
Crear una visualización web que permita identificar (identify) la dependencia (dependency) que existe entre el precio del barril de petróleo y la producción diaria de petróleo en Colombia.
También, que la Viz permita comparar (compare) las tendencias (trends) del precio del barril de petróleo contra la cantidad de pozos perforados en Colombia.

Por último, que la Viz presente (present) la tendencia (trend) de los ingresos nacionales por conceptos de venta de petróleo, con el objetivo de resaltar el impacto (positivo o negativo) que tiene el precio del barril de petróleo en los ingresos de la Nación.

## Marcas y Canales – How
En los 3 gráficos de líneas, se usaron como marcas puntos conectados por líneas. Tanto los datos del eje X como los del eje Y están ordenados secuencialmente. En cada gráfico se usó un color distinto, asociado a la naturaleza del dato que se deseaba mostrar, por ejemplo, verde para el petróleo, verde oscuro para la venta de petróleo y negro el precio del barril de petróleo.

Con respecto al gráfico de barras, se usaron como marcas líneas verticales ordenadas tanto en el eje X como en el eje Y.

En todos los gráficos se usó la posición vertical, para mostrar el tamaño del valor que se deseaba graficar. Además, también se usó en cada gráfico un título y un subtítulo descriptivo, para ayudar al usuario a entender la información que se está visualizando.

## Insights
-	Efectivamente existe una dependencia entre el precio del barril de petróleo y la producción diaria de petróleo en Colombia. Cuando el precio del barril está alto, Colombia invierte más en nuevas perforaciones, lo cual influye directamente en la cantidad de barriles de petróleo que se producirán en los próximos meses, que al final, significa más dinero para la Nación.
-	En qué año comenzó la caída en el precio del barril de petróleo a nivel mundial: año 2014.
-	En qué año comenzó la caída de la tasa de producción diaria de petróleo en Colombia: año 2015.
-	De cuanto fue la caída en los ingresos diarios por concepto de venta de petróleo en Colombia: del 2014 al 2015 fue del 46%.

## Tecnologías Usadas
Para el desarrollo del proyecto se usaron las siguientes tecnologías:
-	Se usó Sublime Text 3 como IDE de desarrollo.
-	HTML y CSS, para maquetar el sitio web.
-	Javascript y el framework d3.js para crear los gráficos (de barras y de líneas) y la respectiva interacción con ellos.
-	GitHub para almacenar el código de la Viz, y de los datos usados. A continuación dicho repositorio principal del proyecto: PrecioBarril-Perforacion-Produccion-2007-2018

## Prerrequisitos y Uso
El proyecto sólo depende del acceso a los datos almacenados en el repositorio https://github.com/ansegura7/PrecioBarrilPerforacionProduccion-2007-2018 y a la disponibilidad del servicio de GitHub Pages, que permite el acceso por medio de un Navegador a la página principal proyecto.

Todos los gráficos muestran el año de análisis seleccionado (con una línea roja punteada), dicho año se puede cambiar con el ComboBox: "Año de Corte".

El gráfico de barras depende de la opción seleccionada en el ComboBox: "Dirección del Gráfico".

## Autores
El autor de los datos es la "Agencia Nacional de Hidrocarburos" del Estado.

Los datos están actualizados hasta mediados del 2018.
El autor de la visualización es Andrés Segura Tinoco, CE 201711582.

## Screenshot
A continuación, se presentan unos pantallazo del proyecto:

![alt text](https://raw.githubusercontent.com/ansegura7/PrecioBarrilPerforacionProduccion-2007-2018/master/screenshots/Figure1.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/PrecioBarrilPerforacionProduccion-2007-2018/master/screenshots/Figure2.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/PrecioBarrilPerforacionProduccion-2007-2018/master/screenshots/Figure3.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/PrecioBarrilPerforacionProduccion-2007-2018/master/screenshots/Figure4.PNG)

## Licencia
Este proyecto está bajo la licencia MIT.
