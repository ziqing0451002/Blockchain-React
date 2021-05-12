import React from 'react';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SingleItem from './singleItem';
import MutiItem from './mutiItem';

export default function Sidebar() {

   //帳號管理List
  const accounts = [
    {
        name: "使用者維護管理", 
        path : "/" ,
         icon : <InboxIcon/>
    },
  ]

  //帳號清查管理List
  const users = [
    {
        name: "清查作業", 
        path : "/" ,
         icon : <InboxIcon/>
    },

    {
        name: '通知信維護',
         path: '/grid',
         icon :<InboxIcon/>
    },
  ]

  //區塊鏈管理List
  const blockChain = [
    {
        name: "連線帳號管理", 
        path: '/UserLoginController',
         icon : <InboxIcon/>
    },

    {
        name: '狀態監控',
         path: '/grid',
         icon :<InboxIcon/>
    },
  ]

  return (
  <List>
      {/* 帳號管理 */}
      <MutiItem  title ="帳號管理" itemArray={accounts}/>

      {/* 組織管理 */}  
      <SingleItem title="組織管理" path="./" /> 

      {/* 權限管理 */}  
      <SingleItem title="權限管理" path="./grid" />

      {/* 帳號清查管理 */}
      <MutiItem  title ="帳號清查管理" itemArray={users}/>

      {/* 區塊鏈管理 */}
      <MutiItem  title ="區塊鏈管理" itemArray={blockChain}/>

      {/* 書證管理 */}  
      <SingleItem title="書證管理" path="./grid" />

      {/* 日誌管理 */}  
      <SingleItem title="日誌管理" path="./grid" />

  </List>
  );
}
