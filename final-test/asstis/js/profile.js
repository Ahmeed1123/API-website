
    function getCureentUserId() {
        let urlParmas = new URLSearchParams(window.location.search)
        const Id =  urlParmas.get("userId");
        return Id;
    }

    SETUI()
    readReqost()
getProfileUsesrs()

function getProfileUsesrs() {
    let basURL = `https://tarmeezAcademy.com/api/v1`
    let userid = getCureentUserId()
    toggleLoader(true);
    axios.get(`${basURL}/users/${userid}`)
    .then((resonse) => {
        toggleLoader(false);
        let post = resonse.data.data
        document.getElementById('name-user-posts').innerHTML = `${post.username}‘s`


        let contact = `
        <div class="profile-image">
        <img id="img-profile-user" src="${post.profile_image}" alt="">
    </div>
        <div class="name-profile">
            <p id="name-profile-user">${post.name}</p>
            <p id="username-profile-user">${post.username}</p>
            <p id="email-profile-user">${post.email = "note Email"}</p>
        </div>
    
        <div class="posts-and-Commdent">
            <div class="posts-length">
                <h3> ${post.posts_count} <span>Posts</span></h3>
            </div>
            <div class="Comments-length">
                <h3> ${post.comments_count} <span>Comments</span></h3>
            </div>
           
        </div>

                `
                document.getElementById("headerProfile").innerHTML = contact ;


    }).catch((error) => {
        toggleLoader(false);
        showScuse( error, "danger")    
    })
  
    

}

function readReqost() {
    let basURL = `https://tarmeezAcademy.com/api/v1`
    const id = getCureentUserId()
    toggleLoader(true);
    axios.get(`${basURL}/users/${id}/posts`)
    .then((response) => {
        toggleLoader(false);
        let posts = response.data.data; 
        document.getElementById("allPostProfileUser").innerHTML = "";

        for(post of posts) {
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
                    <span class="img-user" onclick="userClicked(post.id)"><img src=${post.author.profile_image} alt=""></span>
                    <h5 class="user-name" onclick="userClicked(post.id)">@${post.author.username}</h5> 
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
                    document.getElementById("allPostProfileUser").innerHTML += contact
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
            toggleLoader(false);
            showScuse( error, "danger")    
        })
}


