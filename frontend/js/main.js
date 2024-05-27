// Image Upload

// Function to handle image upload
function handleImageUpload(event) {
    const fileInput = event.target.files[0];
    const formData = new FormData();
    formData.append('file', fileInput);
  
    fetch('http://localhost:6969/upload-image', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error uploading image: ' + response.statusText);
      }
      return response.json(); // Assuming the server responds with JSON
    })
    .then(data => {
      console.log('Image uploaded successfully:', data);
          // Display image preview in the preview box
    const imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = `<img src="${data.url}" alt="Uploaded Image">`;

    // Set the title and author in the preview box
    const titleInput = document.getElementById('front-title');
    const authorInput = document.getElementById('front-writer');
    
    const previewTitle = document.getElementById('preview-title');
    const previewAuthor = document.getElementById('preview-author');


    previewTitle.textContent = titleInput.value || 'No title';
    previewAuthor.textContent = authorInput.value || 'Unknown author';
   
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  }

// Add event listeners to image upload inputs
document.getElementById('front-cover-image').addEventListener('change', handleImageUpload);
document.getElementById('back-cover-image').addEventListener('change', handleImageUpload);
document.getElementById('writer-photo').addEventListener('change', handleImageUpload);
document.getElementById('publisher-logo').addEventListener('change', handleImageUpload);
document.getElementById('publisher-qr').addEventListener('change', handleImageUpload);


// Text Input and Formatting

// Add event listeners to text input and textarea elements
// document.getElementById('front-title').addEventListener('input', handleTextInput);
// document.getElementById('writer-thought').addEventListener('input', handleTextInput);
// document.getElementById('publisher-intro').addEventListener('input', handleTextInput);
// document.getElementById('page1-content').addEventListener('input', handleTextInput);

// // Function to handle text input events
// function handleTextInput(event) {
//     const targetElement = event.target;
//     const text = targetElement.value;
    
//     // Update UI with the formatted text
//     const formattedText = applyFormatting(text);
//     targetElement.value = formattedText;
// }

// // Function to apply formatting options to text
// function applyFormatting(text) {
//     // Example: Apply bold formatting by adding '<b>' and '</b>' tags
//     text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // **text** for bold
    
//     // Example: Apply italic formatting by adding '<i>' and '</i>' tags
//     text = text.replace(/__(.*?)__/g, '<i>$1</i>'); // __text__ for italic
    
//     // Example: Apply underline formatting by adding '<u>' and '</u>' tags
//     text = text.replace(/~~(.*?)~~/g, '<u>$1</u>'); // ~~text~~ for underline
    
//     // Example: Apply alignment formatting by adding style attribute
//     text = text.replace(/\|\|(.*?)\|\|/g, '<div style="text-align: $1;">$2</div>'); // ||left||text|| for alignment
    
//     return text;
// }
