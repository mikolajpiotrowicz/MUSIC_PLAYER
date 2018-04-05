import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import requestJSON from "../helpers/requestJSON";
import qs from 'query-string';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faCheckSquare, faCoffee} from '@fortawesome/fontawesome-free-solid'

export default class Controls extends React.Component {
    constructor() {
        super();
        this.state = {
            currentDirectory: '/',
            files: undefined,
            ...getInitialData(),
        };
        this.getDirectory = this.getDirectory.bind(this);
    }

    async getDirectory(dirname) {
        const data = await requestJSON({
            pathname: '/getdirectory',
            search: "?" + qs.stringify({path: `${this.state.currentDirectory}/${dirname}`})
        });
        this.setState({
            currentDirectory: `${this.state.currentDirectory}/${dirname}`,
            files: this.sortList(data.files)
        });
    }

    async previousDirectory() {
        const data = await requestJSON({
            pathname: '/getdirectory',
            search: "?" + qs.stringify({path: this.state.currentDirectory.substr(0, this.state.currentDirectory.lastIndexOf("/"))})
        });
        this.setState({
            currentDirectory: this.state.currentDirectory.substr(0, this.state.currentDirectory.lastIndexOf("/")),
            files: this.sortList(data.files)
        });
    }

    async getFile(path) {

    }

    async componentDidMount() {
        const data = await requestJSON({
            pathname: '/getdirectory'
        });
        this.setState({
            files: this.sortList(data.files)
        })
    }

    sortList(list) {
        const cmp = (a, b) => a == b ? 0 : (a > b ? 1 : -1);
        return list.sort((a, b) => a.isDirectory !== b.isDirectory ? cmp(b.isDirectory, a.isDirectory) : cmp(a.name, b.name));
    }

    render() {
        let fileList = null;
        if (this.state.files) {
            console.log(this.state.files)
            fileList = this.state.files.map((f, i) =>
                <div key={i} onClick={() => (f.isDirectory) ? this.getDirectory(f.name) : this.getFile(f.name)}
                     className='fileRow'>
                    <a>{f.name}{(f.isDirectory ?
                        <FontAwesomeIcon icon='folder'/> : null)}
                    </a>
                </div>);
        }

        return (
            <div className="playlist">
                <div className='playlist__control-panel'>
                    <FontAwesomeIcon
                        onClick={() => {
                            (this.state.currentDirectory !== '/') ? this.previousDirectory() : null
                        }}
                        icon='chevron-left'
                        className={(this.state.currentDirectory === '/') ? 'playlist__control-panel--button button-disabled' : 'playlist__control-panel--button'}/>
                    <FontAwesomeIcon icon='trash'
                                     className='playlist__control-panel--button'/>
                    <FontAwesomeIcon icon='info-circle'
                                     className='playlist__control-panel--button'/>


                </div>
                {(this.state.files && this.state.files[0].type === 'announce') ? <div onClick={() => {this.previousDirectory()}} className='fileRow'>{this.state.files[0].name}</div> : fileList}
            </div>
        )
    }
}


