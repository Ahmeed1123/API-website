SETUI();
let  currentPage = 1 ;
let lastpage = 1 ;
// invinte scroll


    // invinte scroll

function readReqost(reload = ture , page = 1 ) {
    let basURL = `https://tarmeezAcademy.com/api/v1`
    toggleLoader(true);
    axios.get(`${basURL}/posts?limit=2&page=${page}`)
    .then((response) => {
        let posts = response.data.data; 
        // lastpage = response.data.meta.last_page;
        // alert(lastpage)
 //todos:
 if(reload  ) {
    document.querySelector(".all-Posts").innerHTML = "";
} 
            
        for(  post of posts) {

            let postTitle = ""

          
             let user = getCreant();
            let isMyPost =  user != null && post.author.id == user.id;
            let buttonContent = ``
            let btnDlite = ``
            if(isMyPost) {
                buttonContent = `
                <button class="btn editPost" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
                </button>
           `
           btnDlite = `   <button class="btn Dliete" onclick="dleteBtncliced('${encodeURIComponent(JSON.stringify(post))}')"> 
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill " viewBox="0 0 16 16">
           <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
         </svg>
           </button>`
           
            }
            if(post.title != null) {
                postTitle = post.title ;
            
            };
            let contact = `
            <div class="card item mb-3" >

            <div class="card-header">
                <span class="img-user" onclick="userClicked(${post.author.id})"><img src=${post.author.profile_image} alt=""></span>
                 <h5 class="user-name"  onclick="userClicked(${post.author.id})">@${post.author.username}</h5> 
                 <div id="Edit-and-remove" class="d-inline-flex ">
                 ${buttonContent}
                 ${btnDlite}

           </div>
            </div>
                
            <div class="card-body" onclick="PostCliced(${post.id} )">
            <div class="img-card">
                <img src="${post.image}" alt="">
                <h6 class="time-post">${post.created_at}</h6>
            </div>
              <h5 class="card-title">${postTitle}</h5>
              <p class="card-text">${post.body}</p>
            </div>
                <div class="card-footer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                      </svg>
                        <span class="commonts-numbar">(${post.comments_count})</span>
                    <p>commonts</p>
                    <span class="ms-2" id="post-tags-${post.id}"> 
          
                    </span>
                </div>            
          </div>
                    `
        
                const current = `post-tags-${post.id}`;
                    document.querySelector(".all-Posts").innerHTML += contact;
            document.getElementById(current).innerHTML = ""
            for(tag of post.tags) {
                let tagsName = `
                <button class="btn btn-tags btn-sm bg-dark text-light" >
                ${tag.name}
            </button>
                `
                document.getElementById(current).innerHTML += tagsName

            }
        }

        }).catch((error) => {
            showScuse( error, "danger")    
        }).finally(() => {
            toggleLoader(false);
        })
}




function loginbutclick() {
    let UsernameIn =   document.getElementById("Username-input").value;
    let password =   document.getElementById("password-input").value;

    

    const params  = {
        "username": UsernameIn ,
        "password":password
    }
    const url = `https://tarmeezacademy.com/api/v1/login`
    toggleLoader(true)
    axios.post(url , params)
    .then((resonse) => {
        localStorage.setItem("token",resonse.data.token)
        console.log(resonse.data)
        console.log(resonse.data.user)
        localStorage.setItem("user",JSON.stringify(resonse.data.user))
        let modal =  document.getElementById("Login-model")
      let modelInstes =  bootstrap.Modal.getInstance(modal)
      modelInstes.hide()
      showScuse(`hallo login whith user
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </svg>
      `);
            SETUI();
    }).catch((error) => {
        const massageEr = error.response.data.message
        showScuse(massageEr , "danger")
    } ).finally(() => {
        toggleLoader(false)
    })
  }
function regsterBtnclicked() {
 let name =   document.getElementById("regster-name-input").value; 
   let UsernameIn =  document.getElementById("regster-usrname-input").value;
 let password =  document.getElementById("regster-password-input").value;
  let image =   document.getElementById("regster-Image-input").files[0];

let formDat = new FormData()
formDat.append("name" , name)
formDat.append("username" , UsernameIn)
formDat.append("password" , password)
formDat.append("image" , image)

    let headers = {
        "Content-Type" : "multipart/form-data" , 
        "authorization" : `Bearer ${localStorage.getItem("token")}`
    }
 
 
    const url = `https://tarmeezacademy.com/api/v1/register`
    toggleLoader(true);
    axios.post(url , formDat , {
        headers: headers
    })
    .then((resonse) => {
        localStorage.setItem("token",resonse.data.token)
        localStorage.setItem("user",JSON.stringify(resonse.data.user))
        let modal =  document.getElementById("Regster-model")
      let modelInstes =  bootstrap.Modal.getInstance(modal)
      modelInstes.hide()
      showScuse(`new user 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </svg>
      `);
            SETUI();
    }).catch((error) => {
        const massageEr = error.response.data.message
        showScuse(massageEr , "danger")
    } ).finally(() => {
    toggleLoader(false);
    })
}


  function showScuse(message ,type="success") {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (messagee, type) => {
  const wrapper = document.createElement('div')
  
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${messagee}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}


    appendAlert(`${message}` , type)
    setTimeout(() => {
        const alertToHide = bootstrap.Alert.getOrCreateInstance('#liveAlertPlaceholder')


    } , 1000)

}


 function SETUI()  {
    let token = localStorage.getItem("token");  
       
    let buttonlog = document.getElementById("button-login");
    let buttonrg = document.getElementById("button-regster");
    let logoutbtn = document.getElementById("logout");

    let addpostbtn = document.getElementById("add-post-user");
    if(token == null) {
        buttonlog.style.display = "inline-block";
        buttonrg.style.display = "inline-block";
        document.querySelector(".buttons.log-out").style.display = "none"
            //todos:
            // divCommentsAdd.remove();
     
        if(addpostbtn != null ) {
            addpostbtn.style.display = "none";
        }
       
    }else {
        buttonlog.style.display = "none";
        buttonrg.style.display = "none";
                //todos:
            // divCommentsAdd.style.display = "none";
        logoutbtn.style.display = "inline-block";
        if(addpostbtn != null ) {
            addpostbtn.style.display = "block";
        }

        let user = getCreant()
        document.getElementById("userName").innerHTML = user.username;
        document.getElementById("profile-image").src = user.profile_image;
     
    }
} 

function Logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    showScuse(`log out user
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
    `);

    SETUI();
}



function CreatNewPostClicked() {
    let postIdIn = document.getElementById("post-id").value;
    let isCreat = postIdIn == null || postIdIn == "";
    alert(isCreat)
    let title =   document.getElementById("post-title-input").value;
    let body =   document.getElementById("post-body-input").value;
    let image = document.getElementById("post-image-input").files[0];

 let formDat = new FormData();
 formDat.append("body",body);
 formDat.append("title",title);
 formDat.append("image",image);

    let headers = {
        "Content-Type" : "multipart/form-data" , 
        "authorization" : `Bearer ${localStorage.getItem("token")}`
    }
    let url = ``
 
    if(isCreat) {
         url = `https://tarmeezacademy.com/api/v1/posts`


       
    } else {
        formDat.append("_method","put")
        url = `https://tarmeezacademy.com/api/v1/posts/${postIdIn}`
      
    

    }
    toggleLoader(true);

    axios.post(url , formDat , {
        headers: headers
    })
    .then((resonse) => {
        let modalcreatepost =  document.getElementById("add-posts")

      let modelInstescreatpost =  bootstrap.Modal.getInstance(modalcreatepost)


      modelInstescreatpost.hide()

        showScuse(`new post has bean created  
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        `);
            SETUI();
            readReqost()
    }).catch((error) => {

        const massageEr = error.resonse.data.message
        showScuse(massageEr , "danger")
    
    }).finally(() => {
        toggleLoader(false);

    })


    

}
function PostCliced(postId) {
   
window.location = `postDitels.html?postId=${postId}`
}
function getCreant() {
    let user = null
    let storeuser = localStorage.getItem("user")
    if(storeuser != null) {
        user = JSON.parse(storeuser);
    }
    return user ;
}
function editPostBtnClicked(postObj) {

    let post = JSON.parse(decodeURIComponent(postObj))


   document.getElementById("post-modal-sub-btn").innerHTML = "Updeate"
    document.getElementById("post-id").value = post.id;
    document.getElementById("post-model-title").innerHTML = "Edit Post";
    document.getElementById("post-title-input").value = post.title;
    document.getElementById("post-body-input").value = post.body;


    let postModel = new bootstrap.Modal(document.getElementById("add-posts") , {})
   
    postModel.toggle()

}


function addButtonClicked() {


    document.getElementById("post-modal-sub-btn").innerHTML = "Craete"
     document.getElementById("post-id").value ="";
     document.getElementById("post-model-title").innerHTML = "Creat a New Post ";
     document.getElementById("post-title-input").value = "";
     document.getElementById("post-body-input").value = "";
     let postModel = new bootstrap.Modal(document.getElementById("add-posts") , {})
     postModel.toggle()
}
function dleteBtncliced(postObj) {
    let post = JSON.parse(decodeURIComponent(postObj))
        console.log(post)

 document.getElementById("delete-post-id-input").value = post.id;
     let postModel = new bootstrap.Modal(document.getElementById("delete-post-modal") , {})
     postModel.toggle()
}
function confirmPostDelte() {
        const idPost =   document.getElementById("delete-post-id-input").value 
        const headers = {
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    const url = `https://tarmeezacademy.com/api/v1/posts/${idPost}`
    toggleLoader(true);

    axios.delete(url ,  {
        headers:headers
    } )
    .then((resonse) => {
        console.log(resonse)
        let modalcreatepost =  document.getElementById("delete-post-modal")
        let modelInstescreatpost =  bootstrap.Modal.getInstance(modalcreatepost)
        modelInstescreatpost.hide()
          showScuse(`The Post has Deleted secsufully
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success d-inline" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>`);
              SETUI();
              readReqost()
    
    }).catch((error) => {
        const massageEr = error.resonse.data.message
        showScuse(massageEr , "danger")
    
    }).finally(() => {
        toggleLoader(false);

    })

}
function profileCliced() {
    const userId = getCreant();

    window.location = `profile.html?userId=${userId.id}`
}
function userClicked( id ) {
    window.location = `profile.html?userId=${id}`
    }

    function toggleLoader(shwo = true) {
        if(shwo) {
            setTimeout(()=> {
                document.getElementById("loaderJs").style.opacity = "1"
                setTimeout(()=> {
                    document.getElementById("loaderJs").style.visibility = "visible"
                } ,1001)
            } ,1001)

        }else  {
            document.getElementById("loaderJs").style.opacity = "0";
            setTimeout(()=> {
                document.getElementById("loaderJs").style.visibility = "hidden"
            } ,1001)
        }
    }