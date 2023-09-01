
const loadCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json()
    const categories = data.data
    
    const tabContainer = document.getElementById('tab-container');
    tabContainer.textContent=""
    categories.forEach(singleCategory => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div>
            <button onclick="handleLoadCard('${singleCategory.category_id}')" class="btn  px-5 py-3 bg-[#FF1F3D] text-white  ">${singleCategory.category}</button>
        </div>
        `;
        tabContainer.appendChild(div);
    });
}
let cards
const handleLoadCard = async (categoryID) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
    const data = await response.json()
    // console.log(data);
    cards = data.data
    // sortByViews()
    const cardContainer = document.getElementById("card-container")
    cardContainer.textContent =''
    const noDataContainer = document.getElementById("no-data-card")
    noDataContainer.textContent =''
    if(categoryID === "1005"){
        
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card ">
            <figure class="px-10 pt-10">
                <img src="./image/Icon.png" alt="" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">Oops!! Sorry, There is no <br>content here</h2>
            </div>
        </div>
        `
        noDataContainer.appendChild(div)
    }
    else{
    cards.forEach(card =>{
        const div = document.createElement('div');
        const second = `${card.others.posted_date}`
        let hours = parseFloat(second)/3600;
        let minute = parseFloat(second)%60;
        let hm;
        let time;
        if(second>0&&minute>0)
        {
             hm =parseInt(hours)+" "+"hrs"+" "+parseInt(minute)+" "+"min"+" "+"ago";
             time =` <p class="absolute bg-[#171717] text-white bottom-2 right-2 px-2 rounded-md">${hm}</p>`
        }
        else{
            hm=''
            time='';
        }

        div.innerHTML = `
        <div class="card">
                <figure class="rounded-md">
                    <div class="relative">
                        <img src="${card.thumbnail}" alt="Shoes" class=" rounded-md md:w-[320px] md:h-[200px]" />
                        ${time}
                    </div>
                </figure>
                <div class=" flex gap-3 justify-start mt-5 px-3 ">
                    <div>
                        <img src="${card.authors[0].profile_picture}" alt="" class="w-10 h-10 rounded-full">
                    </div>
                    <div >
                        <h2 class="font-bold text-base text-[#171717] mb-1">${card.title}</h2>
                        <div class="flex flex-row justify-start gap-1 mb-3">
                        <p class="font-normal text-sm">${card.authors[0].profile_name}</p>
                        <p>${card.authors[0].verified? ` <img src="blue.svg"/>`: ''}</p>
                        </div>
                        <p class="font-normal text-sm">${card.others.views} views</p>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(div)
    })
    }
}

loadCategory()
handleLoadCard(categoryID = 1000)




const sortByViews = ()=>{
    cards.sort((a,b) => parseFloat(b.others.views)- parseFloat(a.others.views)) 
    
}

const blogHandler =()=>{
    window.location.href ='blog.html'
}