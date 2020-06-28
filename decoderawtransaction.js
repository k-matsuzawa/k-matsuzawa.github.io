const updateField = async function(event) {
  const inputTx = document.getElementById("inputTx");
  const decodedtx = document.getElementById("decodedtx");
  try {
    const req = {
      hex: inputTx.value,
      network: 'liquidregtest',
      mainchainNetwork: 'regtest',
    };
    const resp = await callJsonApi('ElementsDecodeRawTransaction', req);
    decodedtx.value = resp.hex;
    return;
  } catch (e) {
  }

  try {
    const req = {
      hex: inputTx.value,
      network: 'regtest',
    };
    const resp = await callJsonApi('DecodeRawTransaction', req);
    decodedtx.value = resp.hex;
    return;
  } catch (e) {
    decodedtx.value = 'Invalid transaction format';
  }
}

Module['onRuntimeInitialized'] = async function(){
  // set decoderawtx function on field change
  document.body.addEventListener("change", updateField);
  if (Module['cfdjsJsonApi']) {
    console.log("exist cfdjsJsonApi.");
  } else {
    console.log("cfdjsJsonApi not found!");
  }
}
