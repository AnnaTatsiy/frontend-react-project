import {Component} from "react";
import axios from "axios";

export default class Image extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: "",
            responseMsg: {
                status: "",
                message: "",
                errors: "",
            },
        };
    }

    // image onchange hander
    handleChange = (e) => {
        let image = null;
        image = e.target.files[0];

        this.setState({
            image: image,
        });
    };

    // submit handler
    submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("image", this.state.image);

        if (data.get('image') === '') {
            data = null
        }

        axios.post("http://127.0.0.1:8000/api/upload", data, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'api/*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        responseMsg: {
                            status: response.data.status,
                            message: response.data.message,
                            errors: response.data.errors
                        },
                    });
                    setTimeout(() => {
                        this.setState({
                            image: "",
                            responseMsg: "",
                        });
                    }, 100000);

                    // getting uploaded images
                    this.props.getImage();

                    document.querySelector("#imageForm").reset();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <div className="ms-auto">
                        <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
                            <div className="div">

                                <div className="form-group py-2">
                                    <label htmlFor="images" className={"mb-2"}>Загрузить фото профиля:</label>
                                    <input
                                        type="file"
                                        name="image"
                                        multiple
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm"
                                    />
                                    <div className="mt-2 ms-1">
                                        {this.state.responseMsg.status === "success" ? (
                                            <div className={"text-success"}>
                                                {this.state.responseMsg.message}
                                            </div>
                                        ) : this.state.responseMsg.status === "failed" ? (
                                            <div className={"text-danger"}>
                                                {this.state.responseMsg.errors}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <div className={"d-flex justify-content-end"}>
                                    <button type="submit" className="btn btn-success btn-sm">
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </form>
            </div>
        );
    }
}