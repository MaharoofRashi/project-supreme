import { 
    Modal,
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter, 
    Button, 
    FormControl, 
    FormLabel, 
    Input 
} from '@chakra-ui/react';

import { useRecoilState } from 'recoil';;
import { leadListState } from '../state/LeadState';

function AddLeadModal({ isOpen, onClose }){
    const [leads, setLeads] = useRecoilState(leadListState);

    const handleAddLead = () => {
        setLeads([...leads, {id: leads.length + 1, name: 'New Lead', status: "New"}]);
        onClose();
    }
}