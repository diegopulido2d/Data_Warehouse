class RegionTreeView{

        constructor() {
            console.log("RegionTreeView constructor");
            this._data =[];

            this.artaraxTreeView = $.artaraxTreeView({
                jsonData: [],// this._data,
                selectedIds: [1,2,3], // just use on update mode (when you run tree view by 'loadTreeViewOnUpdate()' function)
                updateCallBack: this.onUpdate, //this.onUpdate,
                deleteCallBack: this.onDelete,
                isDisplayChildren: true // use this to collapse all nodes on load (it works just on insert mode, when you run tree view by 'loadTreeViewOnInsert()' function)
            });
        }

        set datos(data) {
            this._data = data;
        }

        initTreeView() {
            // load treeview
            // console.log(this._data);
            this.artaraxTreeView.destroy();
            this.artaraxTreeView.loadData(this._data);
            this.artaraxTreeView.loadTreeViewOnInsert(0); // 1 is the root id
                    
        }

        onUpdate(obj) {
            callbackUpdate(obj);
        }

        onDelete(obj){
            callbackDelete(obj);
        }



        // onUpdate(obj)
        // {
        //     // save data into db here
        //     alert('onUpdate executed >> selected object is >>' + JSON.stringify(obj));
        // }

        // onDelete(obj)
        // {
        //     // save data into db here
        //     alert('onDelete executed >> selected object is >>' + JSON.stringify(obj));
        // }
    
}

export default RegionTreeView; 