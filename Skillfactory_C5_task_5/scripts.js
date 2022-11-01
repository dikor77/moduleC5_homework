const url_template = (p, l) => `https://picsum.photos/v2/list?page=${p}&limit=${l}`
const result_node = document.querySelector('.j-result');
const btn_node = document.querySelector('.j-btn-request');
const btn_clear_node = document.querySelector('.j-btn-clear');
const page_node = document.querySelector('.input-page');
const limit_node = document.querySelector('.input-limit');

let page_param = localStorage.getItem('Page_param');
let limit_param = localStorage.getItem('Limit_param');

if(page_param != null && limit_param != null)
{
    console.log("Use Page and Limit from local storage: ", page_param, limit_param) 
    page_node.value = Number(page_param)
    limit_node.value = Number(limit_param)
    runRequest(Number(page_param), Number(limit_param))
}

function useRequest(p,l) {
    return fetch(url_template(p, l))
    .then((response) => {
      // console.log("1: ", response)
      return response.json()
    })
    .then((json) => {
      // console.log("2: ", json)
      localStorage.setItem('Page_param', p);
      localStorage.setItem('Limit_param', l);
      displayResult(json)

    })
    .catch(() => { console.log('fetch error') });
};

function displayResult(data) {

  let cards = '';

  data.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img
            src="${item.download_url}"
            class="card-image"
            />
            <p>${item.author}</p>
        </div>
        `;
        cards = cards + cardBlock;
    });

    result_node.innerHTML = cards;
};

function runRequest(page, limit){
    if((page < 1 || page > 10) && (limit < 1 || limit > 10))
    {
      console.log("Page and Limit are out of range [1..10]")  
    } else if(page < 1 || page > 10)
    {
      console.log("Page is out of range [1..10]")  
    } else if(limit < 1 || limit > 10)
    {
      console.log("Limit is out of range [1..10]")  
    } else{
      let res = useRequest(page, limit);
    }
}

btn_node.addEventListener('click', () => {
    p = Number(page_node.value);
    l = Number(limit_node.value);
          
    runRequest(p, l)
  });

btn_clear_node.addEventListener('click', () => {
    localStorage.clear();
    page_node.value = 1
    limit_node.value = 1
    result_node.innerHTML = "Results will be here"
  });