import React, { Component } from 'react'


export default function LoadableContent(WrappedComponent){


    return class extends Component{
        
            constructor(props){
                super(props)
                this.state = { isLoading: false }
                this.toggleLoading = this.toggleLoading.bind(this)
            }

            toggleLoading(isLoading){
                this.setState({isLoading})
            }

            render(){
                return(
                    <>
                        <div className={this.state.isLoading ? 'overlay' : 'hidden'}></div>
                        <div className={this.state.isLoading ? 'loader-modal' : 'hidden'}></div>
                        <WrappedComponent toggleLoading={this.toggleLoading} isLoading={this.state.isLoading} {...this.props} />
                    </>
                )
            }
            
        }
}
