let tools = [];
const loadTools = async () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    tools = data.data.tools;
    displayTools(tools, 6);
};

const displayTools = (tools, dataLimit) => {
    const toolsContainer = document.getElementById("tools-container");
    toolsContainer.innerHTML = "";

    const showAll = document.getElementById("show-all");
    if (dataLimit && tools.length > 6) {
        tools = tools.slice(0, 6);
        showAll.classList.remove("d-none");
    } else {
        showAll.classList.add("d-none");
    }

    const noTool = document.getElementById("no-found-message");
    if (tools.length === 0) {
        noTool.classList.remove("d-none");
    } else {
        noTool.classList.add("d-none");
    }

    tools.forEach(tool => {
        const toolDiv = document.createElement("div");
        toolDiv.classList.add("col");
        toolDiv.innerHTML = `
            <div class="card">
                <img src="${tool.image }" class="card-img-top p-4" alt="${tool.name} image NOT available">
                <div class="card-body">
                    
                    <h5 >Features:</h5>
                    
                    <p>1. ${tool.features[0]}</p>
                    <p>2. ${tool.features[1]}</p>
                    <p>3. ${tool.features[2]}</p>
                    <hr>
                    <h4 class="card-title text-center">${tool.name}</h4>
                    <div class="row col-12 d-flex justify-content-between ">
                        <div class="col">
                        <p class="card-text"> <i class="far fa-calendar-alt"></i> ${tool.published_in}</p>
                        </div>
                        <div class="col">
                        <button onclick="loadToolDetails('${tool.id}')" class="btn position-absolute bottom-0 end-0 " data-bs-toggle="modal" data-bs-target="#toolDetailModal "><i class='fas fa-arrow-right' style='font-size:30px;color:red'></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        toolsContainer.appendChild(toolDiv);
    });

    toggleSpinner(false);
};

const processSearch = () => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value.trim().toLowerCase();
    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchText)
    );
    displayTools(filteredTools);
};

document.getElementById("btn-search").addEventListener("click", () => {
    processSearch();
});

document.getElementById("search-field").addEventListener("keypress", event => {
    if (event.key === "Enter") {
        processSearch();
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
        loaderSection.classList.remove("d-none");
    } else {
        loaderSection.classList.add("d-none");
    }
};

document.getElementById("btn-show-all").addEventListener("click", () => {
    displayTools(tools);
});

const loadToolDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displaytoolDetails(data.data);
};

const displaytoolDetails = tool => {
    const modalTitle = document.getElementById("toolDetailModalLabel");
    modalTitle.innerText = tool.tool_name;

    
    
    const toolDetails = document.getElementById("tool-details");
    toolDetails.innerHTML = `
        
        <section class="container">
                            <div class="row  col-md-12  justify-content-between gap-3 pt-5 px-5">
                                <div class="col-md col-sm-12  pt-3 px-3 bg-dark-subtle rounded">
                                    <h5>${tool.description}</h5>
                                    
                                    <div class="row col-md-12 gap-2 py-2 px-2 justify-content-between ">
                                        <div class=" col-md-3 col-sm-12 px-2 bg-light rounded border border-light-subtle text-primary-emphasis fw-semibold">
                                            <p>${tool.pricing[0].price}</p>
                                            <hr>
                                            <p>${tool.pricing[0].plan} </p>
                    
                                        </div>
                                        <div class="col-md-3 col-sm-12 px-2 bg-light rounded border border-light-subtle text-success fw-semibold">
                                            <p>${tool.pricing[1].price}</p>
                                            <hr>
                                            <p>${tool.pricing[1].plan} </p>
                                            
                                        </div>
                                        <div class="col-md-3 col-sm-12 px-2 bg-light rounded border border-light-subtle text-center fw-semibold text-success-emphasis">
                                            <p>${tool.pricing[2].price}</p>
                                            <hr>
                                            <p>${tool.pricing[2].plan} </p>
                    
                                        </div>
                                    </div>
                                    <hr> 
                                    <div class="row col-md-12  justify-content-between">
                                        <div class="col-md col-sm-12">
                                        <h4 >Features</h4>
                                        
                    
                                        <p ><i class='fas fa-stop' style='font-size:8px'></i> ${tool.features[1].feature_name}</p>
                                        <p  ><i class='fas fa-stop' style='font-size:8px'></i> ${tool.features[2].feature_name}</p>
                                        <p ><i class='fas fa-stop' style='font-size:8px'></i> ${tool.features[3].feature_name}</p>
                                        </div>
                                        <div class="col-md col-sm-12">
                                            <h4>Integrations</h4>
                                            
                                
                                            <p><i class='fas fa-stop' style='font-size:8px'></i> ${tool.integrations===null || tool.integrations[0]=== undefined  ? 'x': tool.integrations[0]  }</p>
                                            <p><i class='fas fa-stop' style='font-size:8px'></i> ${tool.integrations===null || tool.integrations[1]=== undefined  ? 'x': tool.integrations[1]  }</p>
                                            <p><i class='fas fa-stop' style='font-size:8px'></i> ${tool.integrations===null || tool.integrations[2]=== undefined ? 'x': tool.integrations[2]  }</p>
                                            
                                        </div>
                                    </div>
                    
                                </div>
                                <div class="col-md col-sm-12 px-3 border border-light-subtle rounded">
                                    <div class="position-relative" >
                                    <img class="img-fluid rounded-4  p-3 mb-2" src="${tool.image_link[0]}" alt="">
                                    <button id="btn-acc" type="button" class="btn rounded-5 btn-danger  position-absolute top-0 end-0 " > ${tool.accuracy.score ===null ? 'not found': ((tool.accuracy.score )*100)}% Accuracy
                                    </button>

                                    </div>
                                
                                
                                    
                                    
                                    <h4 class=" pt-2  text-center">${tool.input_output_examples ? tool.input_output_examples[0].input : "No input available"}</h4>
                                    <h6 class=" text-center">${tool.input_output_examples ? tool.input_output_examples[0].output : "No output available"}</h6>
                                    
                                    

                    
                    
                                </div>
                    
                            </div>


                        </section>
        
        
    `;
/**
 accuracy show or none
 */
    const accSection = document.getElementById("btn-acc");
    if (tool.accuracy.score ===null ) {
        accSection.classList.add("d-none");
    } else {
        accSection.classList.remove("d-none");
    }
};

// sort by date part start

// ... your existing code ...

const sortToolsByDateAscending = () => {
    const sortedTools = tools.sort((a, b) => {
      const dateA = new Date(a.published_in);
      const dateB = new Date(b.published_in);
      return dateA - dateB;
    });
    displayTools(sortedTools, 6);
  };
  
  document.getElementById("sortButton-ascending").addEventListener("click", sortToolsByDateAscending);
  
// ... your existing code ...

const sortToolsByDateDescending = () => {
    const sortedTools = tools.sort((a, b) => {
      const dateA = new Date(a.published_in);
      const dateB = new Date(b.published_in);
      return dateB - dateA;
    });
    displayTools(sortedTools, 6);
  };
  
  document.getElementById("sortButton-descending").addEventListener("click", sortToolsByDateDescending);
  

// sort by date part end


loadTools();


