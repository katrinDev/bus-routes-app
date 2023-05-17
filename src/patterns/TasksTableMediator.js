import { factoryMethodClient } from "./FactoryMethodClient.ts";

class TasksTableMediator {
    constructor() {
      this.components = {};
    }
  
    register(componentName, component) {
      this.components[componentName] = component;
    }
  
    handleFileUpload(event) {
      try {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const jsonData = JSON.parse(event.target.result);
  
          console.log(jsonData);
  
          //patterns usage
          let fullData = factoryMethodClient(jsonData);
          console.log(fullData);
          this.components["TasksTable"].setData(fullData);
        };
        reader.readAsText(file);
      } catch (error) {
        this.components["TasksTable"].setSnackbarProps({
          ...this.components["TasksTable"].snackbarProps,
          open: true,
          message: `${error.message}`,
        });
      }
    }
  }


  export default new TasksTableMediator();