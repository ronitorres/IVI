import { Pressable, PressableProps, Text, View } from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';


type Props = PressableProps & {
  data: {
    nome: string,
    telefone: number,
    observacao: string
  }
}

export function Visitante({ data, ...rest }: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: "#CECECE",
        padding: 16,
        borderRadius: 5,
        marginBottom: 12, // Espaço entre os itens
      }}
      {...rest}
    >
      <View style={{ flexDirection: "column", gap: 3 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{data.nome}</Text>
        <Text style={{ fontWeight: 'bold' }}>Telefone: {data.telefone}</Text>
        <Text style={{ fontWeight: 'bold' }}>Observação: {data.observacao}</Text>
      </View>
    </Pressable>
  );
}
