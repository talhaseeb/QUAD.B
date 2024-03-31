// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOzBxJOmX9tMehkO2NWTApNAyMA5Lp3xQ",
    authDomain: "quadb-ef88d.firebaseapp.com",
    projectId: "quadb-ef88d",
    storageBucket: "quadb-ef88d.appspot.com",
    messagingSenderId: "121262670164",
    appId: "1:121262670164:web:99cac37dad6356d9c9c8c1"
  };
  
  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  
  // Get references to DOM elements
  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');
  
  // Event listener for upload button
  uploadButton.addEventListener('click', function() {
    const file = fileInput.files[0];
  
    if (file) {
      // Create a storage reference
      const storageRef = app.storage().ref('images/' + file.name);
  
      // Upload file to Firebase Storage
      const uploadTask = storageRef.put(file);
  
      // Monitor upload progress
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          console.log('Upload is ' + snapshot.state);
          console.log('Upload progress: ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '%');
        }, 
        (error) => {
          // Handle unsuccessful uploads
          console.error('Error uploading file:', error);
        }, 
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            // You can use downloadURL to display the image or store it in a database
          });
        }
      );
    } else {
      console.error('No file selected');
    }
  });
  