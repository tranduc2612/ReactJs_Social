import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function ModalConfirm({title,setShowConfirm,showConfirm}) {

    return ( <>
        <Modal 
            show={showConfirm} 
            onHide={()=>setShowConfirm(false)} 
            animation={true}
            centered>
            <Modal.Header className="text-center" closeButton>
                <Modal.Title className="d-flex justify-content-center w-100">
                    <span className="fs-2">
                        {title && title.charAt(0).toUpperCase() + title.slice(1)}
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{minHeight: "70px"}}>
                <span className="fs-4">Bạn có chắc chắn muốn xóa {title} này không?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShowConfirm(false)}>
                    <span className="fs-4">Không</span>
                </Button>
                <Button variant="primary" onClick={()=>setShowConfirm(false)}>
                    <span className="fs-4">Xóa</span>
                </Button>
            </Modal.Footer>
      </Modal>
    </> );
}

export default ModalConfirm;