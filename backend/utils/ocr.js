import { ocrSpace } from 'ocr-space-api-wrapper'

async function parseResume (b) {
    try {
      // Using the OCR.space default free API key (max 10reqs in 10mins) + remote file
    //   const res1 = await ocrSpace('http://dl.a9t9.com/ocrbenchmark/eng.png');
  
      // Using your personal API key + local file
    //   const res2 = await ocrSpace('/path/to/file.pdf', { apiKey: '<API_KEY_HERE>' });
      
      // Using your personal API key + base64 image + custom language
    //   const res3 = await ocrSpace('data:image/png;base64...', { apiKey: 'K84571867088957', language: 'eng' });
    console.log('parsing resume')
      const res3 = await ocrSpace(b, { apiKey: 'K84279553388957', language: 'eng' });
    //   console.log(res3.ParsedResults?.[0]?.ParsedText)
      return res3.ParsedResults?.[0]?.ParsedText
    } catch (error) {
      console.error(error);
    }

  }
  //apikey: "K84279553388957",


export default parseResume;