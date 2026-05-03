import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { tipo, nome, email, contato, mensagem } = req.body;

    // Configuração de destino conforme sua regra de negócio
    const destinatario = (tipo === 'projeto') 
        ? 'uupsoftwaresolutions@gmail.com' 
        : 'uup.application@gmail.com';

    try {
        await resend.emails.send({
            from: 'UUP System <onboarding@resend.dev>', // Verifique o remetente no Resend
            to: destinatario,
            subject: `[${tipo.toUpperCase()}] Nova entrada via Portal`,
            html: `<h3>Nova mensagem de ${nome}</h3>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Contato:</strong> ${contato}</p>
                   <p><strong>Mensagem:</strong> ${mensagem}</p>`
        });

        return res.status(200).json({ success: true, message: 'ENVIADO_COM_SUCESSO' });
    } catch (error) {
        return res.status(500).json({ error: 'ERRO_AO_ENVIAR' });
    }
}