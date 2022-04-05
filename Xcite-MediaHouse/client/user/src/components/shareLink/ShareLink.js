import React from 'react'
import {WhatsappShareButton,WhatsappIcon,FacebookShareButton,FacebookIcon,LinkedinShareButton,LinkedinIcon,EmailShareButton,EmailIcon,RedditShareButton,RedditIcon,TwitterShareButton,TwitterIcon,TelegramShareButton,TelegramIcon} from 'react-share'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { getShareLink } from '../../redux/action/extraAction'

const ShareLink = () => {

  const shareLink = useSelector((state) => state.setShareLink.share);
  const dispatch = useDispatch();
  const onCopy = () => {
    const link = shareLink?.link
    navigator.clipboard.writeText(link);
    toast.success("Link Copied");
  }

  const onClose = () => {
    dispatch(getShareLink({share : false,link : ""}))
  }

  return (
    <>
    <div className="ShareLinkContainer center-row" style={shareLink?.share === false || shareLink?.share === undefined ? {display:'none',visibility:'hidden'} : null}>
        <div className="ShareLinkContainer-div">

          <div style={{width:"100%",marginBottom:"20px"}} className="center-row-left-right">
            <h3 className='ShareLinkContainer-div__title'>Share</h3>
            <span className='ShareLinkContainer-div__clsBtn center-row' onClick={onClose}><ion-icon name="close-outline"></ion-icon></span>
          </div>

          <div style={{width:"100%",marginBottom:"25px"}} className="center-row-left">
            <WhatsappShareButton url={shareLink?.link} style={{marginRight:"15px"}}>
              <WhatsappIcon round="true"></WhatsappIcon>
            </WhatsappShareButton>
            <FacebookShareButton url={shareLink?.link} style={{marginRight:"15px"}}>
              <FacebookIcon round="true"></FacebookIcon>
            </FacebookShareButton>
            <TwitterShareButton url={shareLink?.link} style={{marginRight:"15px"}}>
              <TwitterIcon round="true"></TwitterIcon>
            </TwitterShareButton>
            <LinkedinShareButton url={shareLink?.link} style={{marginRight:"15px"}}>
              <LinkedinIcon round="true"></LinkedinIcon>
            </LinkedinShareButton>
            <RedditShareButton url={shareLink?.link} style={{marginRight:"15px"}}>
              <RedditIcon round="true"></RedditIcon>
            </RedditShareButton>
            <TelegramShareButton url={shareLink?.link} style={{marginRight:"15px"}}>
              <TelegramIcon round="true"></TelegramIcon>
            </TelegramShareButton>
            <EmailShareButton url={shareLink?.link} style={{marginRight:"15px"}}>
              <EmailIcon round="true"></EmailIcon>
            </EmailShareButton>
          </div>

          <div style={{width:"100%",padding:"10px",background:"var(--primary-color)",borderRadius:"2px"}} className={`center-row-left-right`}>
              <input type="text" style={{width:"100%",height:"100%",background:"transparent",border:"none",outline:"none",color:"var(--lighter-grey)"}} value={shareLink?.link} readonly/>
              <button style={{height:"100%",background:"transparent",outline:"none",border:"none",padding:"2px 4px",color:"var(--lighter-grey)",cursor:"pointer"}} onClick={onCopy}>copy</button>
          </div>

        </div>
    </div>
    </>
  )
}

export default ShareLink