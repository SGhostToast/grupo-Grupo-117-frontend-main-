import Friends from './friends'
import InvitReceived from './invit_received'
import InvitSent from './invit_sent'
import InvitarRechazar from './invitar_rechazar'

export default function FriendsPage() {
    return(
        <>
        <div className="title">
            <img className="title-bg" src="https://st2.depositphotos.com/23387462/46229/i/600/depositphotos_462298254-stock-photo-minsk-belarus-march-2021-top.jpg" alt="" />
            <div className="title-content">
                <h1>¡Puedes ver tus invitaciones y amigos aqui!</h1>
            </div>
        </div>
        <div className="beneath">
            <Friends />
            <InvitReceived />
            <InvitSent />
            <InvitarRechazar />
        </div>
        </>
    )
}