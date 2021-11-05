

export const fileUpload = async ( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/my-img-clouds/image/upload';


    const formData = new FormData();

    //presets de claudinary
    formData.append('upload_preset', 'react-journal');
    //archivo
    formData.append('file', file);
    //creando la carpeta para guardar los archivos en claudinary
    formData.append('folder', 'journal-app');

    try {

        //await del fetch de la url, con la configuracion POST correspondiente
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if(resp.ok){

            const cloudResp = await resp.json()
            return cloudResp.secure_url

        } else{
            throw resp.json()
        }

    } catch (error) {
        throw error;
    }
}