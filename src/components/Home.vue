<template>
	<div class="container">
		<h1>Upload and Filter Files</h1>	
		<div class="form-container">
			<form enctype="multipart/form-data" novalidate>
				<md-input-container>
				  <label>Upload Files</label>
				  <md-file v-model="files" @selected="filesChange($event)" multiple></md-file>
				</md-input-container>
				<md-button class="md-raised md-primary" @click="uploadFiles($event)">Upload Files</md-button>
				<md-button class="md-raised md-primary" @click="showFiles($event)">Show/Hide Files</md-button>
			</form>		
		</div>
		<div class="files-table-container" v-show="showFilesTable">
			<div class="filter-btns-container">
				<md-button class="md-raised md-primary" @click="filterFiles('all')">Show All</md-button>
				<md-button class="md-raised md-primary" @click="filterFiles('pdf')">Show Pdf</md-button>
				<md-button class="md-raised md-primary" @click="filterFiles('video')">Show Videos</md-button>
			</div>
			<md-table-card>
			  <md-toolbar>
			    <h1 class="md-title">Files</h1>
			  </md-toolbar>

			  <md-table>
			    <md-table-header>
			      <md-table-row>
			        <md-table-head>Filename</md-table-head>
			        <md-table-head>Type </md-table-head>
			      </md-table-row>
			    </md-table-header>

			    <md-table-body>
			       <md-table-row v-for="(row, rowIndex) in filteredFiles" :key="rowIndex" :md-item="row">
			        <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" v-if="columnIndex !== 'file' && columnIndex !== 'originalName'">
			          <span>{{ column }}</span>
			        </md-table-cell> 
			      </md-table-row> 
			    </md-table-body>
			  </md-table>
			</md-table-card>		
		</div>
	</div>
</template>

<script>
import FileUploadService from '@/services/FileUploadService'; // fake service

export default {
  name: 'Home',
  data () {
		return {
	  	uploadedFiles: [],
	  	filteredFiles: [],
	  	formData: null,
	  	isFileChanged: false,
	  	files: null,
	  	showFilesTable: false
	 	}
	},
	methods: {
		filesChange(fileList) {
			const formData = new FormData();
			if (!fileList.length) return;

      Array
        .from(Array(fileList.length).keys())
        .map(file => {
          formData.append('files', fileList[file], fileList[file].name);
        });
      this.formData = formData;
      this.isFileChanged = true;
    },
    uploadFiles(evt) {
    	if(!this.formData)
    		return;
    	if(this.isFileChanged) {
    		this.save(this.formData);
    		this.isFileChanged = false;
    		this.files = null;
    	}
    },
    save(formData) {
      FileUploadService.upload(formData)
        .then(files => {
          this.uploadedFiles = files;
          this.filteredFiles = Object.assign({}, false, this.uploadedFiles);
        });
	  },
	  showFiles(evt) {
	  	if(this.showFilesTable)
	  		this.showFilesTable = false;
	  	else
	  		this.showFilesTable = true;
	  },
	  filterFiles(type) {
	  	switch(type) {
	  		case 'all': 
	  			this.filteredFiles = Object.assign({}, false, this.uploadedFiles);
	  			break;
	  		case 'pdf':
	  			this.filteredFiles = this.uploadedFiles.filter((file) => {
	  				return file.type.includes('pdf');
	  			});
	  			break;
	  		case 'video':
	  			this.filteredFiles = this.uploadedFiles.filter((file) => {
	  				return file.type.includes('video');
	  			});
	  			break;
	  		default: 
	  			this.filteredFiles = Object.assign({}, false, this.uploadedFiles);
	  			break;
	  	}
	  }
	}
}
</script>