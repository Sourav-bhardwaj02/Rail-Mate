from insightface.app import FaceAnalysis

app = FaceAnalysis(
    providers=["CPUExecutionProvider"]
)

app.prepare(
    ctx_id=0,
    det_size=(640, 640)
)

print("MODEL LOADED")