const loadCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json()
    const categories = data.data
    
    const tabContainer = document.getElementById('tab-container');
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

const handleLoadCard = async (categoryID) =>{
    
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
    const data = await response.json()
    
    const cards = data.data
    const cardContainer = document.getElementById("card-container")
    cardContainer.textContent =''
    const noDataContainer = document.getElementById("no-data-card")
    noDataContainer.textContent =''
    if(cards.length == 0){
        
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card  ">
            <figure class="px-10 pt-10">
                <img src="./image/Icon.png" alt="Shoes" class="rounded-xl" />
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
        console.log(card);
        const div = document.createElement('div')

        div.innerHTML = `
        <div class="card">
                <figure class="rounded-md">
                    <div class="relative">
                        <img src="${card.thumbnail}" alt="Shoes" class=" rounded-md md:w-[320px] md:h-[200px]" />
                        <p class="absolute bg-[#171717] text-white bottom-2 right-2 px-2 rounded-md">3hrs 56 min ago</p>
                    </div>
                </figure>
                <div class=" flex gap-3 justify-start mt-5 px-3 ">
                    <div>
                        <img src="${card.authors[0].profile_picture}" alt="" class="w-10 h-10 rounded-full">
                    </div>
                    <div >
                        <h2 class="font-bold text-base text-[#171717] mb-1">${card.title}</h2>
                        <p class="font-normal text-sm mb-3">${card.authors[0].profile_name} <i class="fa-solid fa-certificate"></i></p>
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