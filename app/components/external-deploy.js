import { EmptyState, Layout, Page, ResourcePicker, Heading, Subheading, Link, TextField, Button } from '@shopify/polaris';
import { masterFetch } from './fetchModule'
import { deleteDeployment } from './deleteModule'
// import { TextField } from './textField'
import axios from 'axios';
// var $ = require('jquery');
import {$,jQuery} from 'jquery';

import React from 'react'
// var fs = require('fs');





class ExternalDeploy extends React.Component {

   state = {
     product_handle: '',
     store_url: '',
     external_product_handle: '',
     external_deploy_url: '',
     delete_id: '',
     deployment_response: ''
   };

   render() {
       return (
               <Page
                   primaryAction={{
                       content: 'Select products',
                       onAction: () => this.setState({ open: true }),
                   }}
               >


                   <TextField onChange={this.valueUpdater('store_url')}
                              value={this.state.store_url}
                               placeholder="enter base store url"
                              label="Store Url Input"
                              >
                   {this.state.store_url}</TextField>

                   <TextField onChange={this.valueUpdater('external_product_handle')}
                              value={this.state.external_product_handle}
                              placeholder="enter product handle"
                              label="Enter Product Handle"
                              >
                   {this.state.external_product_handle}</TextField>


                   <Button onClick={this.externalDeploy}>External Store Deploy!</Button>

                   <Heading>You're Quik.site will be available at:</Heading>
                   <Link url={this.state.external_deploy_url} external={true}>{this.state.product_handle}</Link>


                   <TextField onChange={this.valueUpdater('delete_id')}
                              value={this.state.delete_id}
                              placeholder="deployment ID for Deletion"
                              label="Delete External Deployment"
                              >
                   {this.state.delete_id}</TextField>

                   <Button onClick={this.externalDelete}>Delete Quiksite</Button>
                   <Heading>{this.state.deployment_response}</Heading>

               </Page >
       );
   }


   handleChange = (value) => {
     console.log(value);
     this.setState({store_url: value});
   };

   valueUpdater(field) {
     return (value) => this.setState({[field]: value});
   }

   externalDeploy = () => {
     console.log("STORE_URL");
     console.log(this.state.store_url);
     console.log("HANDLE");
     console.log(this.state.external_product_handle);

     masterFetch( this.state.store_url, this.state.external_product_handle )
     .then( (res) => {
       this.setState({external_deploy_url: 'https://' + res.url})
       this.setState({product_handle: this.state.external_product_handle})
       this.setState({delete_id: res.deploymentId})
     } )
   }

   externalDelete = () => {
     console.log(this.state.delete_id);
     deleteDeployment(this.state.delete_id)
     .then( (res) => {
       console.log(res);
         this.setState({deployment_response: res.state})

     } )
   }

}

export default ExternalDeploy;
