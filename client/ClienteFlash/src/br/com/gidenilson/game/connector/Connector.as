package br.com.gidenilson.game.connector
{
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.events.ErrorEvent;
	import flash.events.SecurityErrorEvent;
	import flash.system.Security;
	import flash.events.ProgressEvent;
	import flash.net.Socket;
	import flash.errors.IOError;
	
	/**
	 * ...
	 * @author Gidenilson A. Santiago
	 */
	public class Connector extends EventDispatcher
	{
		private var socket:Socket = new Socket();
		private var server:String;
		private var port:int;
		
		public function Connector(server:String, port:int):void {
			this.server = server;
			this.port = port;
		}
		public function connect():void {
			socket.connect(server, port);
			socket.addEventListener(Event.CONNECT, _socketConnect);
			socket.addEventListener(IOErrorEvent.IO_ERROR, _socketConnectError);
			socket.addEventListener(ErrorEvent.ERROR, _errorHandler); 
			socket.addEventListener(SecurityErrorEvent.SECURITY_ERROR, _securityError);
			socket.addEventListener(ProgressEvent.SOCKET_DATA, _socketDataReceive);
			socket.addEventListener(Event.CLOSE, _socketClose);
			
			
		}
		
		private function _socketConnect(e:Event):void
		{

			var ev:ConnectorEvent = new ConnectorEvent(ConnectorEvent.CONNECTED);
			ev.data = null;
			dispatchEvent(ev);
			
			
		}
		
		public function send(msg:String):void
		{
			
			//socket.writeUTF(msg);
			socket.writeUTFBytes(msg);
			socket.flush();
		
		}
		
		private function _socketConnectError(e:IOErrorEvent):void
		{

			var ev:ConnectorEvent = new ConnectorEvent(ConnectorEvent.CONNECT_ERROR);
			ev.data = null;
			dispatchEvent(ev);
		}
		
		private function _socketClose(e:Event):void
		{

			var ev:ConnectorEvent = new ConnectorEvent(ConnectorEvent.CLOSE);
			ev.data = null;
			dispatchEvent(ev);
		}
		
		private function _socketDataReceive(e:Event):void
		{
			
			while (socket.bytesAvailable)
			{
				var ev:ConnectorEvent = new ConnectorEvent(ConnectorEvent.RECEIVE);
				ev.data = e.target.readUTFBytes(e.target.bytesAvailable);
				dispatchEvent(ev);
			}
		
		}
		private function _securityError(e:SecurityErrorEvent):void {
			trace(e);
		}
		private function _errorHandler(e:ErrorEvent):void {
			trace(e);
		}
	
	}

}