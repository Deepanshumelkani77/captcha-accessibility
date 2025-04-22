import torch.nn as nn
import torch

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=36):
        super(SimpleCNN, self).__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(1, 32, 3, 1), nn.ReLU(),
            nn.Conv2d(32, 64, 3, 1), nn.ReLU(),
            nn.Flatten()
        )
        self.fc = nn.Linear(64 * 24 * 24, num_classes)

    def forward(self, x):
        x = self.conv(x)
        return self.fc(x)

class AudioNet(nn.Module):
    def __init__(self):
        super(AudioNet, self).__init__()
        self.rnn = nn.LSTM(input_size=64, hidden_size=128, batch_first=True)
        self.fc = nn.Linear(128, 10)

    def forward(self, x):
        out, _ = self.rnn(x)
        return self.fc(out[:, -1, :])

def load_model():
    # Dummy pretrained models
    return {
        "text": SimpleCNN(10),
        "image": SimpleCNN(36),
        "audio": AudioNet()
    }
