package com.softparc.servercom;


import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UdpListener {

	public static void main(String[] args) throws Exception
		
		   {
		      int i=11;
		      do {
		    	  DatagramSocket datagramSocket = new DatagramSocket(1138);
		    	  
		    	  
		    	  byte[] message = new byte[25];
		    	  DatagramPacket packet = new DatagramPacket(message, message.length);
		
		    	  datagramSocket.receive(packet);
		    	  message=packet.getData();
		    	 if(message[0]!=83 && message[0]!=-82 ) 
		    	 {
		    	  for(int j=0;j<message.length;j++)
		    	  {
		    	  System.out.print(message[j] + " " );
		    	  
		    	  }
		    	  System.out.print(message.toString());
		    	  System.out.println();
		    	 } 
		    	  
		
		    	  datagramSocket.close();
		    	  
		      }while(i!=0);
	}
	

	

} 
//-22 26 -12 110 -7 -18 -30 67 -24 -48 31 -18 89 4 127 63 9 82 0 0 0 0 0 0 0 
//-10 19 52 57 121 -117 -32 -127 -124 -92 -6 74 96 98 3 -117 92 -63 -19 -14 2 40 7 126 122 