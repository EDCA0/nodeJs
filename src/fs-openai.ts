import { fs } from "./2-native";
export const path = require ('path');

async function transcriptAudio (audioFilePath:any, apiKey: any) {
    try {
        if(!fs.existsSync(audioFilePath)) {
            throw new Error ('El archivo de audio no existe');
        }

        const audioFile = fs.readFileSync(audioFilePath);
        const formData = new FormData();
        const blob = new Blob([audioFile]);
    
        formData.append('file', blob, path.basename(audioFilePath));
        formData.append('model', 'whisper-1');

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers:  {
                Authorization: `Bearer ${apiKey}`
            },
            body: formData
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error en la API: ${JSON.stringify(errorData)}`)
        }

        const data = await response.json();
        const trasncription = data.text;

        const outputFilePath :string = path.join(
            path.dirname(audioFilePath), 
            `${path.basename(
                audioFilePath, 
                path.extname(audioFilePath)
            )}_transcription.txt`
        )

        fs.writeFileSync(outputFilePath, trasncription);
        console.log('Transcripcion guardada en ', outputFilePath);
        return trasncription        
    } catch (error) {
        console.log('Error durante la transcripcion', error)
    }
}
const audioPath = path.join(__dirname, '../assets/audio.mp3');
const openaiApiKey = '../.env/cc';

transcriptAudio(audioPath, openaiApiKey)
    .then(transcription => {
      console.log('transcripcion completa');  
      console.log(transcription);  
    })
    .catch(error => {
        console.error('Fallo la transcripcion', error)
    });