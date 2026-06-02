# Proxecto de fin de ciclo DAW

> *Tarefa*: Realiza unha breve descrición do proxecto (entre 100 e 300 palabras). Resalta o fundamental **coas túas palabras**. Utiliza unha linguaxe correcta, pero natural, que o entenda todo o mundo, incluso e en especial, as persoas que non teñan un coñecemento técnico avanzado. Pode ser un estrato ou resumo dos apartados que se contemplan na memoria.

> *Posible resposta*: ErasmusStay é unha aplicación web pensada para facilitar a busca de aloxamento temporal a estudantes Erasmus que se desprazan a Malta. O proxecto nace dunha necesidade real: atopar vivenda nun país estranxeiro pode ser complicado, inseguro e depender demasiado de grupos de WhatsApp, Facebook ou anuncios pouco fiables.

A plataforma permite consultar anuncios de habitacións, estudos e pisos completos, aplicar filtros por localización, prezo, tipo de vivenda e servizos dispoñibles, e ver a información detallada de cada aloxamento. Os propietarios poden crear anuncios, engadir imaxes e xestionar os seus datos de contacto desde a súa conta. Os estudantes poden consultar os anuncios, solicitar contacto cos propietarios e deixar valoracións, mentres que o administrador pode revisar anuncios, moderar comentarios e xestionar usuarios.

O proxecto está desenvolvido cun backend en Django e Django REST Framework, unha base de datos PostgreSQL e un frontend independente en Vue. A aplicación está preparada para executarse en contedores Docker, facilitando a posta en marcha nun contorno de desenvolvemento.


## Instalación/Posta en marcha

> *Tarefa*: **Indica os pasos a seguir para que poidamos probar a vosa aplicación nun contorno de desenvolvemento**. 
> Debes incluír carga de datos inicial automática para poder probar a app.
> É necesario indicar as credenciais dos usuarios necesarios para probar a app.
> No caso de usar unha API Rest debes poñer aquí un enlace ao documento "API reference" que creaches describindo a forma de interaccionar coa API.

> *Resposta*: Para executar o proxecto nun contorno local é necesario ter instalados:

Docker
Docker Compose
Git
1. Clonar o repositorio
git clone URL_DO_REPOSITORIO
cd TFCT
2. Configurar variables de contorno

O proxecto inclúe ficheiros de exemplo para as variables de contorno.

Crear o ficheiro .env do backend a partir do exemplo:

cp backend/.env.example backend/.env

Crear o ficheiro .env do frontend:

cp frontend/.env.example frontend/.env

A configuración por defecto está pensada para desenvolvemento local.

3. Construír e levantar os contedores
docker compose up -d --build

Este comando inicia:

base de datos PostgreSQL;
backend Django;
frontend Vue servido con Nginx.
4. Aplicar migracións
docker compose exec backend python manage.py migrate
5. Cargar datos iniciais automaticamente

Para poder probar a aplicación con datos de exemplo, executar:

docker compose exec backend python create_data.py

Este script crea usuarios de proba, perfís, propietarios, estudantes, anuncios, imaxes de exemplo, valoracións e solicitudes de contacto.

6. Acceder á aplicación

Frontend:

http://localhost:8080

Backend / API REST:

http://localhost:8000/api/

Panel de administración de Django:

http://localhost:8000/admin/
Credenciais de proba

Administrador:

Usuario: admin
Contrasinal: admin1234

Propietario 1:

Usuario: owner1
Contrasinal: owner1234

Propietario 2:

Usuario: owner2
Contrasinal: owner1234

Estudante 1:

Usuario: student1
Contrasinal: student1234

Estudante 2:

Usuario: student2
Contrasinal: student1234

API Reference: Consultar doc/API_REFERENCE.md

## Uso

> *Tarefa*: **Indica a URL para poder acceder á túa aplicación web e os usuarios para poder probala na avaliación **. 

## Sobre a persoa autora

> *Tarefa*: Realiza unha breve descrición de quen es desde unha perspectiva profesional, os teus puntos fortes, tecnoloxías que máis dominas e o motivo de por que te decantaches por este proxecto. **Non máis de 200 palabras**. Indica unha forma fiable de contactar contigo no presente e no futuro.

## Licencia

> *Tarefa*: É requisito INDISPENSABLE licenciar explicitamente o proxecto. Crea un ficheiro `LICENSE` na raíz do repositorio.

## Guía de contribución

> *Tarefa*: Se o teu proxecto se trata de software libre, é importante que expoñas como se pode contribuír a el. Algúns exemplos disto son realizar novas funcionalidades, corrección e/ou optimización de código, realización de tests automatizados, novas interfaces de integración, desenvolvemento de plugins, etc. Intenta dar unha mensaxe concisa.

## Memoria

> *Tarefa*: Indexa de forma ordenada a memoria do teu proxecto.
> Durante a redacción da memoria, debes ir completando progresivamente o anexo de Referencias.

1. [Estudo preliminar](doc/templates/1_estudo_preliminar.md)
2. [Análise](doc/templates/2_analise.md)
3. [Deseño](doc/templates/3_deseno.md)
4. [Planificación e Orzamento](doc/templates/a3_orzamento.md)
5. [Codificación e Probas](doc/templates/4_codificacion_probas.md)
6. [Futuro e comercialización](doc/templates/5_manuais.md)
