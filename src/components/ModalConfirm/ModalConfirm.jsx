import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { deletePost } from '~/redux/actions/postActions';


function ModalConfirm({ title, setShowConfirm, showConfirm, idPost, setProgress, progress }) {
    const userData = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        const token = userData.access_token;
        const id_post = idPost.toString();
        const dataSend = {
            token,
            id_post,
            function: "D"
        }
        setShowConfirm(false)
        setProgress(prev => prev + 50);
        const req = await dispatch(deletePost(dataSend));
        setProgress(prev => prev + 50);
        if (req.payload) {
            toast.success("Xóa thành công");
        } else {
            toast.error("Xóa thất bại");
        }
    }

    return (<>
        <Modal
            show={showConfirm}
            onHide={() => setShowConfirm(false)}
            animation={true}
            centered>
            <Modal.Header className="text-center" closeButton>
                <Modal.Title className="d-flex justify-content-center w-100">
                    <span className="fs-2">
                        {title && title.charAt(0).toUpperCase() + title.slice(1)}
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: "70px" }}>
                <span className="fs-4">Bạn có chắc chắn muốn xóa {title} này không?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                    <span className="fs-4">Không</span>
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    <span className="fs-4">Xóa</span>
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default ModalConfirm;