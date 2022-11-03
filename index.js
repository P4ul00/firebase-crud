import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    getTasks,
  } from "./firebase.js";
  
  const taskForm = document.getElementById("task-form");
  const tasksContainer = document.getElementById("tasks-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetTasks((querySnapshot) => {
      tasksContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const task = doc.data();
  
        tasksContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <h3 class="h5">${task.nome}</h3>
      <p>${task.marca}</p>
      <h3 class="h5">${task.preco}</h3>
      <h3 class="h5">${task.quantidade}</h3>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Delete
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Edit
        </button>
      </div>
    </div>`;
      });
  
      const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteTask(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            taskForm["task-nome"].value = task.nome;
            taskForm["task-marca"].value = task.marca;
            taskForm["task-preco"].value = task.preco;
            taskForm["task-quantidade"].value = task.quantidade;
            editStatus = true;
            id = doc.id;
            taskForm["btn-task-form"].innerText = "Update";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const nome = taskForm["task-nome"];
    const marca= taskForm["task-marca"];
    const preco= taskForm["task-preco"];
    const quantidade= taskForm["task-quantidade"];
    try {
      if (!editStatus) {
        await saveTask(nome.value, marca.value,preco.value,quantidade.value);
      } else {
        await updateTask(id, {
          nome: nome.value,
          marca: marca.value,
          preco: preco.value,
          quantidade: quantidade.value
        });
  
        editStatus = false;
        id = "";
        taskForm["btn-task-form"].innerText = "Salvar";
      }
  
      taskForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });





  