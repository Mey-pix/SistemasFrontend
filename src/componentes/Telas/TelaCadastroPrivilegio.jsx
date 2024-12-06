import { Alert } from "react-bootstrap";
import FormCadPrivilegios from "./Formularios/FormCadPrivilegio";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaPrivilegios from "./Tabelas/TabelaPrivilegios";
import { consultarPrivilegio } from "../../servicos/servicoPrivilegio";

export default function TelaCadastroPrivilegio(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDePrivilegios, setListaDePrivilegios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [privilegios, setPrivilegios] = useState([]);
    const [privilegioSelecionado, setPrivilegioSelecionado] = useState({
        codigo:0,
        descricao:""

    });

    useEffect(()=>{
        consultarPrivilegio().then((lista)=>{
            setListaDePrivilegios(lista);
        });
    },[]); //listaVazia -> didMount
   

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Privilegio
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaPrivilegios listaDePrivilegios={listaDePrivilegios}
                                        setListaDePrivilegios={setListaDePrivilegios} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setPrivilegioSelecionado={setPrivilegioSelecionado} /> :
                        <FormCadPrivilegios listaDePrivilegios={listaDePrivilegios}
                                         setListaDePrivilegios={setListaDePrivilegios}
                                         setExibirTabela={setExibirTabela}
                                         privilegioSelecionado={privilegioSelecionado}
                                         setPrivilegioSelecionado={setPrivilegioSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}