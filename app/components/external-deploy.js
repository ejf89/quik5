import { EmptyState, Layout, Page,  Heading, Subheading, Link, TextField, Button } from '@shopify/polaris';
import { masterFetch, postToTable, getPage, getScript } from './fetchModule'
import { deleteDeployment, updateInTable } from './deleteModule'
import axios from 'axios';
import {$,jQuery} from 'jquery';

import React from 'react'

class ExternalDeploy extends React.Component {

   state = {
     product_handle: '',
     store_url: '',
     external_product_handle: '',
     external_deploy_url: '',
     delete_id: '',
     deployment_response: '',
     encoded_html: '',
     encoded_js: '',
     ecoded_css: ''
   };

   render() {
       return (
               <Page>
                 <Layout>
                  <Layout.Section>
                     <TextField onChange={this.valueUpdater('store_url')}
                                value={this.state.store_url}
                                 placeholder="enter base store url"
                                label="Store Url Input (excluding '.myshopify.com')"
                                >
                     {this.state.store_url}</TextField>

                     <TextField onChange={this.valueUpdater('external_product_handle')}
                                value={this.state.external_product_handle}
                                placeholder="eg: 'essential-bath-bundle'"
                                label="Enter Product Handle"
                                >
                     {this.state.external_product_handle}</TextField>
                     <br></br>
                     <Button onClick={this.externalDeploy}>Deploy Quiksite</Button>
                     <Heading>You're Quik.site will be available at:</Heading>
                   </Layout.Section>


                       <Layout.Section>
                       <Link url={this.state.external_deploy_url} external={true}>{this.state.product_handle}</Link>


                       <TextField onChange={this.valueUpdater('delete_id')}
                                  value={this.state.delete_id}
                                  placeholder="deployment ID for Deletion"
                                  label="Delete External Deployment"
                                  >
                       {this.state.delete_id}</TextField>
                       <br></br>
                       <Button onClick={this.externalDelete}>Delete Quiksite</Button>
                       <Heading>{this.state.deployment_response}</Heading>
                    </Layout.Section>
                   </Layout>
               </Page >
       );
   }



   componentDidMount() {
    // getScript()
    // .then( (script) => {
    //   this.setState({ encoded_js: script })
    // } )
    // .then( () => {
    //   getPage()
    //   .then( (page) => {
    //     this.setState({ encoded_html: page })
    //   } )
    // })

    getPage()
    .then( (page) => {
      this.setState({ encoded_html: page })
    } )
    console.log('ASSETS FETCHED');
   }

   handleChange = (value) => {
     this.setState({store_url: value});
   };

   valueUpdater(field) {
     return (value) => this.setState({[field]: value});
   }

   externalDeploy = () => {

     masterFetch( this.state.store_url, this.state.external_product_handle, this.state.encoded_html )
     .then( (res) => {
       this.setState({external_deploy_url: 'https://' + res.url})
       this.setState({product_handle: this.state.external_product_handle})
       this.setState({delete_id: res.deploymentId})
       return res
     } )
     .then( (res) => {
       postToTable( this.state.store_url,  this.state.external_deploy_url, this.state.delete_id, this.state.external_product_handle )
     } )
   }

   externalDelete = () => {
     console.log(this.state.delete_id);
     deleteDeployment(this.state.delete_id)
     .then( (res) => {
       console.log(res);
         this.setState({deployment_response: res.state})

         updateInTable(this.state.delete_id)
     } )
   }

}

export default ExternalDeploy;
