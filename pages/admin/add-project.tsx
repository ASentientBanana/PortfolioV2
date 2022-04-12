import { styled, Container } from '@mui/material';
import { useRef } from 'react';

const AddProject = () => {

    const formRef = useRef(null); 
    
    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        if(formRef.current){
            const fd = new FormData(formRef.current);
            const files = fd.get('image-file');
            const f = new FileReader();
            if(files){
                const _file = f.readAsDataURL(files as Blob);
                f.onload = async () =>{
                    console.log('done');
                    const response = await fetch('http://localhost:3000/api/admin/upload-image',{
                        method:'POST',
                        body:JSON.stringify({
                            file:f.result,
                            test:true
                        })
                    })
                    console.log(await response.json());
                }
            }
            
        }
    }

    return(
        <Container>
            <form ref={formRef} onSubmit={handleSubmit} >
                <input name='image-file' id='image-file' multiple={false} type="file" />
                <button type="submit">CLICK</button>
            </form>
        </Container>
    )
}

export default AddProject;
