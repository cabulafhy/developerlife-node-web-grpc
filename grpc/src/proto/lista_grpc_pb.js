// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var lista_pb = require('./lista_pb.js');

function serialize_lista_CadastroReply(arg) {
  if (!(arg instanceof lista_pb.CadastroReply)) {
    throw new Error('Expected argument of type lista.CadastroReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lista_CadastroReply(buffer_arg) {
  return lista_pb.CadastroReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lista_CadastroResquest(arg) {
  if (!(arg instanceof lista_pb.CadastroResquest)) {
    throw new Error('Expected argument of type lista.CadastroResquest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lista_CadastroResquest(buffer_arg) {
  return lista_pb.CadastroResquest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lista_ConsultaReply(arg) {
  if (!(arg instanceof lista_pb.ConsultaReply)) {
    throw new Error('Expected argument of type lista.ConsultaReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lista_ConsultaReply(buffer_arg) {
  return lista_pb.ConsultaReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lista_ConsultaRequest(arg) {
  if (!(arg instanceof lista_pb.ConsultaRequest)) {
    throw new Error('Expected argument of type lista.ConsultaRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lista_ConsultaRequest(buffer_arg) {
  return lista_pb.ConsultaRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var ListaService = exports.ListaService = {
  cadastro: {
    path: '/lista.Lista/cadastro',
    requestStream: false,
    responseStream: false,
    requestType: lista_pb.CadastroResquest,
    responseType: lista_pb.CadastroReply,
    requestSerialize: serialize_lista_CadastroResquest,
    requestDeserialize: deserialize_lista_CadastroResquest,
    responseSerialize: serialize_lista_CadastroReply,
    responseDeserialize: deserialize_lista_CadastroReply,
  },
  listar: {
    path: '/lista.Lista/listar',
    requestStream: false,
    responseStream: false,
    requestType: lista_pb.ConsultaRequest,
    responseType: lista_pb.ConsultaReply,
    requestSerialize: serialize_lista_ConsultaRequest,
    requestDeserialize: deserialize_lista_ConsultaRequest,
    responseSerialize: serialize_lista_ConsultaReply,
    responseDeserialize: deserialize_lista_ConsultaReply,
  },
};

exports.ListaClient = grpc.makeGenericClientConstructor(ListaService);
