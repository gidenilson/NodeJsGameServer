package br.com.gidenilson.game.connector {
	import flash.display.SimpleButton;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.text.TextFieldAutoSize;
	
	/**
	 * ...
	 * @author Gidenilson Alves Santiago
	 */
	public class Teste extends Sprite {
		
		private var connector:Connector;
		private var texto:TextField = new TextField();
		private var botao:TextField = new TextField();
		private var contador:int = 0;
		
		public function Teste():void {
			if (stage)
				init();
			else
				addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void {
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			texto.text = "texto";
			texto.type = TextFieldType.INPUT;
			texto.border = true;
			texto.multiline = true;
			texto.wordWrap = true;
			texto.width = 480;
			texto.height = 200;
			texto.x = 10;
			texto.y = 10;			
			addChild(texto);
			
			botao.text = "enviar";
			botao.autoSize = TextFieldAutoSize.CENTER;
			botao.type = TextFieldType.DYNAMIC;
			botao.backgroundColor = 0xAAAAAA;
			botao.background = true;
			botao.selectable = false;
			botao.textColor = 0x000000;
			botao.mouseEnabled;
			botao.y = 220;
			botao.addEventListener(MouseEvent.CLICK, _enviarClick);
			
			addChild(botao);

			
			connector = new Connector("127.0.0.1", 5000);
			connector.connect();
			connector.addEventListener(ConnectorEvent.CONNECTED, _onConnected);
			connector.addEventListener(ConnectorEvent.RECEIVE, _onData);
		
		}
		
		private function _onConnected(e:ConnectorEvent):void {
			//connector.send('{"login":" a mensagem agora ficou bem maior!"}');
			trace("conectado");
		}
		
		private function _onData(e:ConnectorEvent):void {
			trace(e.data);
		}
		private function _enviarClick(e:MouseEvent):void {
			connector.send(texto.text);
		}
	}

}