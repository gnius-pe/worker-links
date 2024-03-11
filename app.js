import  express  from "express";
import morgan from "morgan";
import axios from "axios";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const urls = [
    "https://comee.page.link/youtube",
    "https://comee.page.link/instagram",
    "https://comee.page.link/tikc",
    "https://comee.page.link/fbc"
  ];
  
function makeRequest(url) {
    axios.get(url).then(function(res){
        console.log(`Successful request to ${url}`);
    })
}

function makeRequests(){
    urls.forEach(url => {
        const vicitas = Math.floor(Math.random() * 600);
        for(let i = 0 ; i < vicitas ; i++ ){
            makeRequest(url);
        }
    })
}

function ejecutarTareaEnMomentoEspecifico(hora, minuto, segundo, tarea) {
    const ahora = new Date();
    let tiempoHastaProximoMomento = new Date();
    console.log(tiempoHastaProximoMomento)
    tiempoHastaProximoMomento.setHours(hora);
    tiempoHastaProximoMomento.setMinutes(minuto);
    tiempoHastaProximoMomento.setSeconds(segundo);

    let tiempoRestante = tiempoHastaProximoMomento - ahora;
    console.log("tiempo restante : " + tiempoRestante);

    // Si el tiempo restante es negativo, entonces ya pasó el momento específico, 
    // por lo que debemos establecerlo para el próximo día
    if (tiempoRestante < 0) {
        tiempoRestante += 24 * 60 * 60 * 1000; // Agregar 24 horas
    }

    // Configurar un temporizador para ejecutar la tarea en el próximo momento específico
    setTimeout(() => {
        tarea();
        // Establecer un temporizador para ejecutar la tarea todos los días a la misma hora
        setInterval(tarea, 24 * 60 * 60 * 1000);
    }, tiempoRestante);
}


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
        
        res.sendFile(path.join(__dirname,'public','index.html'));
    }
)

app.listen(port,()=>{
    console.log('En ejecucion por el ',port)
})
ejecutarTareaEnMomentoEspecifico(19,2,38,makeRequests);