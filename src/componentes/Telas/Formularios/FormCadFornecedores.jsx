import { Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { alterarFornecedor, gravarFornecedor } from '../../../servicos/servicoFornecedor';
import toast, {Toaster} from 'react-hot-toast';

export default function FormCadFornecedores(props) {
const [fornecedor, setFornecedor] = useState(props.fornecedorSelecionado);
const [formValidado, setFormValidado] = useState(false);


   // Função para manipular a submissão do formulário
function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       // Formatar a data de validade para o formato "yyyy-mm-dd"

       if (!props.modoEdicao) {
           // Cadastrar o fornecedor
           gravarFornecedor(fornecedor)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setExibirTabela(true);
                   } else {
                       toast.error(resultado.mensagem);
                   }
               });
       } else {
           // Editar o fornecedor
           alterarFornecedor(fornecedor)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setListaDeFornecedores(
                           props.listaDeFornecedores.map((item) => {
                               if (item.codigo !== fornecedor.codigo) return item;
                               else return fornecedor;
                           })
                       );

                       // Após a alteração, resetar o estado para o modo de adição
                       props.setModoEdicao(false); // Mudar para o modo de adicionar
                       
                       // Resetar o fornecedor selecionado
                       props.setFornecedorSelecionado({
                           codigo: 0,
                           nome: "",
                           endereco: "", 
                           contato: "",   
                           cpf: ""
                       });

                       // Mostrar a tabela novamente
                       props.setExibirTabela(true);
                   } else {
                       toast.error(resultado.mensagem);
                   }
               });
       }
   } else {
       setFormValidado(true);
   }
   evento.preventDefault();
   evento.stopPropagation();
}

function manipularMudanca(evento) {
   const elemento = evento.target.name;
   const valor = evento.target.value;
   setFornecedor({ ...fornecedor, [elemento]: valor });
}

return (
   
   <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
       <Row className="mb-4">
           <Form.Group as={Col} md="4">
               <Form.Label>Código</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="codigo"
                   name="codigo"
                   value={fornecedor.codigo}
                   disabled={props.modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do fornecedor!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Nome</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="nome"
                   name="nome"
                   value={fornecedor.nome}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o nome do fornecedor!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Endereço</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="endereco"
                   name="endereco"
                   value={fornecedor.endereco}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o endereço do fornecedor!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Contato</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="contato"
                   name="contato"
                   value={fornecedor.contato}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o contato do fornecedor!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>CPF</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="cpf"
                   name="cpf"
                   value={fornecedor.cpf}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe o cpf do fornecedor!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       
       <Row className='mt-2 mb-2'>
           <Col md={1}>
               <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
           </Col>
           <Col md={{ offset: 1 }}>
               <Button onClick={() => {
                   props.setExibirTabela(true);
               }}>Voltar</Button>
           </Col>
       </Row>
       <Toaster position="top-right"/>
   </Form>
);
}